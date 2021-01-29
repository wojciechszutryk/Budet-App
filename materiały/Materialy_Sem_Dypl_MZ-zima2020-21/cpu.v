module cpu (
	//wejscia kontrolne
	input clk,
	input reset_n,
	
	//interfejs pamieci
	output reg [3:0] mem_address,
	input [7:0] mem_data_r,
	output reg [7:0] mem_data_w,
	output reg mem_wr,
	output reg mem_rd,
	
	//interfejs do debugowania
	output [2:0] dbg_state,
	output [3:0] dbg_r0,
	output [3:0] dbg_r1,
	output [3:0] dbg_pc
);


reg [2:0] state;	//przechowuje aktualny stan mikroprocesora
reg [3:0] pc;		//rejestr PC - licznik programu
reg [7:0] opcode;	//rejestr do tymczasowego przechowywania kodu instrukcji pobranego z pamieci

reg [3:0] r0;		//rejestr r0
reg [3:0] r1;		//rejestr r1

//przypisania zapewniajace podglad wewnetrznych sygnalow
assign dbg_state = state;
assign dbg_r0 = r0;
assign dbg_r1 = r1;
assign dbg_pc = pc;


//glowna maszyna stanow mikroprocesora:

always@(posedge clk, negedge reset_n)
if(reset_n == 0)	//po wykryciu aktywnosci na sygnale reset_n...
begin
	state <= 0;		//zerujemy podstawowe rejestry mikroprocesora
	pc <= 0;
	mem_wr <= 0;	//zerujemy sygnaly zezwolenia na zapis i odczyt do- i z pamieci operacyjnej
	mem_rd <= 0;
end
else
begin
	case(state)
		0:
		begin
			state <= 1;			//przechodzimy do nastepnego stanu
			mem_address <= pc;	//na magistrali adresowej wystawiamy adres rozkazu do pobrania
		end
		
		1:
		begin
			state <= 2;			//przechodzimy do nastepnego stanu
			pc <= pc + 1;		//zwiekszamy zawartosc PC o 1
			mem_rd <= 1;		//wystawiamy strob odczytu z pamieci
		end
		
		2:
		begin
			state <= 3;
			mem_rd <= 0;		//konczymy strob odczytu z pamieci
		end
		
		3:
		begin
			state <= 4;
			opcode <= mem_data_r;		//odczytana dana z pamieci traktujemy jako kod operacji
		end
		
		4:
		begin
			state <= 5;
			if(opcode[7]==0)					//jesli bit 7 ma wartosc 0, to operacja arytmetyczna lub skok
			begin
				case(opcode[6:4])				//analizujemy bity 6, 5 i 4...
					3'b000:						//jesli wszystkie sa ustawione na 000...
					begin
												//wykonujemy skok pod adres dany stala natychmiastowa
						pc <= opcode[3:0];		//zaladuj do PC wartosc znaleziona w bitach 3:0 kodu instrukcji
					end
					
					3'b010:						//jesli bity 6:4 maja wartosc 010...
					begin
						r0 <= r0 + r1;			//wykonujemy dodawanie: add r0, r1 (r0 = r0 + r1)
					end
					
					3'b011:
					begin
						r1 <= r0 + r1;		//wykonujemy dodawanie : add r0, r1 (r1 = r0 + r1)
					end
							
									// jeœli bit 6 ma wartoœæ 1 a bit 5 wartoœæ to wykonywane zostaje mno¿enie 
									// jeœli bit 4 ma wartoœæ 0 to iloczyn zapisany w r0 a jeœli wartoœæ 1 to zapisany w r1						

					3'b100:
					begin
						r0 <= r0 * r1;		//wykonujemy mno¿enie: mul r0, r1 (r0 = r0 * r1)
					end

					3'b101:
					begin
						r1 <= r0 * r1;		//wykonujemy mno¿enie: mul r0, r1 (r1 = r0 * r1)
					end

				endcase
			end
			else									//gdy bit 7 != 0, to kod operacji stanowi instrukcje load, store lub move
			begin
				if(opcode[6])						//bit 6 == 1 -> instrukcja load/store
				begin
					mem_address <= opcode[3:0];		//...wtedy adres znajduje sie w bitach 3:0
					if(opcode[5])					//jesli bit 5 jest ustawiony, to mamy do czynienia z zapisem (store)
					begin
						if(opcode[4])				//bitem 4 wybieramy, ktory rejestr zapisac (r0 gdy 0 lub r1 gdy 1)
							mem_data_w <= r1;		//wystawiamy na magistrale zapisu do pamieci zawartosc r1
						else
							mem_data_w <= r0;		//wystawiamy na magistrale zapisu do pamieci zawartosc r0
					end
				end
				else								//jesli bit 6 ma wartosc 0...
				begin								//to mamy do czynienia z instrukcjami wpisywania stalej natychmiastowej lub move
					case(opcode[5:4])				//analizujemy bity 5 i 4
						2'b00: r0 <= opcode[3:0];	//imm to r0 (stala natychmiastowa do r0)
						2'b01: r1 <= opcode[3:0];	//imm to r1 (stala natychmiastowa do r1)
						2'b10: r0 <= r1;			//mov r0, r1 (kopiowanie r0 = r1)
						2'b11: r1 <= r0;			//mov r1, r0 (kopiowanie r1 = r0)	
					endcase
				end
			end
		end
		
		5:			//kontyuacja operacji zapisu lub odczytu
		begin
			state <= 6;
			if(opcode[7:6] == 2'b11)
			begin
				if(opcode[5])
					mem_wr <= 1;	//wystawiamy aktywny sygnal zezwolenia na zapis do pamieci
				else
					mem_rd <= 1;	//wystawiamy aktywny sygnal zezwolenia na odczyt z pamieci
				
			end
		end
		
		6:	//wait state
		begin
			state <= 7;
			mem_wr <= 0;	//wylaczamy oba sygnaly zezwolenia na zapis/odczyt
			mem_rd <= 0;
		end
		
		7:	//konczymy cykl odczytu
		begin
			state <= 0;
			if(opcode[7:5]==3'b110)			//jesli byla operacja odczytu
				if(opcode[4]==0)		//wybieramy rejestr
					r0 <= mem_data_r;	//wpisujemy odczytana z pamieci liczbe do rejestru r0
				else
					r1 <= mem_data_r;	//wpisujemy odczytana z pamieci liczbe do rejestru r1
		end
		
	endcase
end

endmodule

