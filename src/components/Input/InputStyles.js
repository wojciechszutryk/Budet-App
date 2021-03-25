import styled from "styled-components";

export const FormGroup = styled.div`
    position: relative;
    padding: 15px 0 0;
    margin-top: 10px;
    width: 100%;
`;

export const Label = styled.label`
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 1rem;
  color: rgb(166, 166, 166);
  &:first-child{
    margin-top: 10px;
  }
`;

export const FormField = styled.input`
  font-family: inherit;
  width: 100%;
  border: 0;
  border-bottom: 2px solid rgb(89, 89, 89);
  outline: 0;
  font-size: 1rem;
  color: black;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;
  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ label {
    font-size: 1rem;
    cursor: text;
    color: rgb(166, 166, 166);
    top: 25px;
  }
  &:focus {
    ~ label {
      position: absolute;
      top: 0;
      display: block;
      transition: 0.2s;
      font-size: .7rem;
      color: rgb(235, 93, 64);
      font-weight: 700;
    }
    padding-bottom: 6px;
    font-weight: 700;
    border-width: 3px;
    border-color: rgb(235, 93, 64);
    border-image-slice: 1;
  }
`;

export const Message = styled.span`
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
	color: rgb(255, 26, 26);
    display: block;
`;

export const FormSelect = styled.select`
    width: 100%;
    margin-top: 20px;
    margin-bottom: 5px;
`;

export const SearchInput = styled(FormField)`
    border: 2px solid rgb(89, 89, 89);
`;

export const SearchTransaction = styled.input`
    font-family: inherit;
    width: 100%;
    border: 1px solid ${({theme}) => theme.colors.black.normal};
    color: ${({theme}) => theme.colors.black.normal};
    text-align: center;
    outline: 0;
    background: ${({theme}) => theme.colors.gray.white};
    transition: border-color 0.2s;
    &::placeholder {
      color: ${({theme}) => theme.colors.gray.normal};;
    }
    &:focus{
      outline: 1px solid ${({theme}) => theme.colors.black.normal};
    }
`;