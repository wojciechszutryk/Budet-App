(this["webpackJsonpBudet-App"]=this["webpackJsonpBudet-App"]||[]).push([[8],{289:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return v}));var c,r,o,s=n(17),i=n(8),a=n(0),b=n(12),j=n(11),u=n(263),d=n(4),l=n(3),O=l.c.span(c||(c=Object(d.a)(["\n  font-weight: 600;\n  color: ",";;\n"])),(function(e){return e.theme.colors.orange.dark})),h=l.c.span(r||(r=Object(d.a)(["\n  font-weight: 600;\n  color: black;\n"]))),p=l.c.div(o||(o=Object(d.a)(["\n  color: red;\n  margin-top: ","px;\n"])),(function(e){return e.theme.spacing.normal})),m=n(20),f=n(21),g=n(23),x=n(1),v=function(e){var t=e.name,n=e.totalAmount,c=e.categories,r=void 0===c?[]:c,o=e.onSubmit,d=Object(a.useState)({}),l=Object(i.a)(d,2),v=l[0],y=l[1],S=Object(a.useState)(!0),k=Object(i.a)(S,2),w=k[0],A=k[1],C=Object(a.useState)(n),B=Object(i.a)(C,2),F=B[0],E=B[1],I=Object(a.useState)(!1),J=Object(i.a)(I,2),M=J[0],T=J[1],q=Object(u.a)().t,R=Object(f.f)();Object(a.useMemo)((function(){t&&n||T(!0)}),[t,n]),Object(a.useMemo)((function(){var e=0;Object.entries(v).forEach((function(t){e+=t[1]})),A(e>n),Object.entries(v).forEach((function(e){e[1]&&0!==e[1]||A(!0)}));for(var t=document.querySelectorAll("input"),c=0;c<t.length;c++)""===t[c].value&&A(!0);E(n-e),r&&0!==r.length||A(!1)}),[v,r,n]);var z=r.map((function(e){return Object(x.jsxs)(b.b,{children:[Object(x.jsx)(b.a,{type:"number",onChange:function(t){return function(e,t){var n={};n[e]=parseInt(t.target.value),y(Object(s.a)(Object(s.a)({},v),n))}(e.value,t)}}),Object(x.jsx)(b.d,{children:e.label})]},e.value)}));return M?(R.push("/budget"),void window.location.reload()):Object(x.jsxs)(x.Fragment,{children:[Object(x.jsx)(O,{children:t}),Object(x.jsxs)("span",{children:[" ",q("Founds")]}),Object(x.jsxs)("div",{children:[Object(x.jsxs)("span",{children:[q("Budget Amount"),": "]}),Object(x.jsx)(h,{children:Object(m.c)(n)})]}),Object(x.jsxs)("form",{id:"budgetCategoriesForm",children:[Object(x.jsx)("div",{children:z}),Object(x.jsxs)(p,{children:[Object(x.jsxs)("span",{children:[q("Other")," "]}),":",F>0?Object(x.jsx)(h,{children:Object(m.c)(F)}):Object(x.jsx)(O,{children:Object(m.c)(F)})]}),Object(x.jsxs)("div",{children:[Object(x.jsx)(g.b,{to:"/budget",children:Object(x.jsx)(j.a,{buttonType:"submit",type:"submit",disabled:w,onClick:function(){o({name:t,totalAmount:n,categories:v})},children:q("Submit")})}),Object(x.jsx)(j.a,{buttonType:"reset",type:"button",onClick:function(){document.getElementById("budgetCategoriesForm").reset(),E(n)},children:"Reset"})]})]})]})}}}]);
//# sourceMappingURL=8.6de84949.chunk.js.map