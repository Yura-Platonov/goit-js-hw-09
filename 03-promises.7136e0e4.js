function e(e,t){return new Promise(((n,o)=>{const s=Math.random()>.3;setTimeout((()=>{s?n({position:e,delay:t}):o({position:e,delay:t})}),t)}))}const t=document.querySelector(".form"),n=document.querySelector("#messages");t.addEventListener("submit",(t=>{t.preventDefault();const o=document.querySelector('input[name="delay"]'),s=document.querySelector('input[name="step"]'),a=document.querySelector('input[name="amount"]'),d=parseInt(o.value),i=parseInt(s.value),l=parseInt(a.value);for(let t=0;t<l;t++){e(t+1,d+t*i).then((({position:e,delay:t})=>{const o=document.createElement("div");o.classList.add("message","fulfilled"),o.textContent=`✅ Fulfilled promise ${e} in ${t}ms`,n.appendChild(o)})).catch((({position:e,delay:t})=>{const o=document.createElement("div");o.classList.add("message","rejected"),o.textContent=`❌ Rejected promise ${e} in ${t}ms`,n.appendChild(o)}))}}));
//# sourceMappingURL=03-promises.7136e0e4.js.map
