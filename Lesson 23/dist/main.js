(()=>{"use strict";var e={223:(e,t,n)=>{n.d(t,{x:()=>r,H:()=>o});const o="https://jsonplaceholder.typicode.com/",r="posts";let c=document.querySelector("#form");document.querySelector("#request").addEventListener("click",(function(e){e.preventDefault(),function(e){return fetch(`${o}${r}/${e}`)}(document.querySelector("#id").value).then((e=>e.json())).then((e=>{console.log(e);let t=e.title,n=e.body,d=document.createElement("div"),l=document.createElement("h3"),u=document.createElement("p");return l.innerHTML="Title: "+t,u.innerHTML="<b>Body:</b> "+n,d.append(l),d.append(u),c.append(d),function(e){let t=document.querySelector("#id").value;return fetch(`${o}${r}/${t}/${e}`)}("comments")})).then((e=>e.json())).then((e=>{console.log(e),e.forEach((e=>{let t=e.name,n=e.body,o=document.createElement("div"),r=document.createElement("p"),d=document.createElement("p");r.innerHTML="<b>Comment Title:</b> "+t,d.innerHTML="<b>Comment Body:</b> "+n,o.append(r),o.append(d),c.after(o)}))}))}))}},t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={exports:{}};return e[o](r,r.exports,n),r.exports}n.d=(e,t)=>{for(var o in t)n.o(t,o)&&!n.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n(223)})();
//# sourceMappingURL=main.js.map