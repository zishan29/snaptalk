(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[626],{4930:function(e,t,s){Promise.resolve().then(s.bind(s,4870))},4870:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return c}});var n=s(7437),a=s(8460),o=s.n(a),r=s(2265),l=s(4033);function c(){let[e,t]=(0,r.useState)(""),[s,a]=(0,r.useState)(""),[c,i]=(0,r.useState)(""),p=(0,l.useRouter)();async function u(n){n.preventDefault(),t("testuser"),a("testuser@123");try{let t=await fetch("https://snap-talk.adaptable.app/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e,password:s})});if(t.ok){let e=await t.json();localStorage.setItem("token",e.token),localStorage.setItem("id",e.userData._id),p.push("/")}if(403===t.status){let e=await t.json();i(e.info.message)}}catch(e){console.log(e)}}async function m(e){e.preventDefault();try{let e=await fetch("https://snap-talk.adaptable.app/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:"testuser",password:"testuser@123"})});if(e.ok){let t=await e.json();localStorage.setItem("token",t.token),localStorage.setItem("id",t.userData._id),p.push("/")}if(403===e.status){let t=await e.json();i(t.info.message)}}catch(e){console.log(e)}}return(0,r.useEffect)(()=>{localStorage.getItem("token")&&(async()=>{try{let e=await fetch("https://snap-talk.adaptable.app/verifyToken",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:localStorage.getItem("token")})});if(401===e.status){let t=await e.json();console.log(t.error),p.push("/login")}200===e.status&&p.push("/")}catch(e){console.log(e)}})()}),(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)("form",{className:o().form,children:[(0,n.jsx)("div",{className:"self-center text-xl font-semibold",children:"Welcome back"}),(0,n.jsxs)("label",{children:[(0,n.jsx)("input",{required:!0,placeholder:"",type:"text",className:o().input,value:e,onChange:e=>t(e.target.value)}),(0,n.jsx)("span",{children:"username"})]}),(0,n.jsxs)("label",{children:[(0,n.jsx)("input",{required:!0,placeholder:"",type:"password",className:o().input,value:s,onChange:e=>a(e.target.value)}),(0,n.jsx)("span",{children:"password"})]}),c&&(0,n.jsx)("div",{className:"text-sm text-[#818181]",children:c}),(0,n.jsxs)("button",{className:o().fancy,onClick:e=>u(e),children:[(0,n.jsx)("span",{className:o()["top-key"]}),(0,n.jsx)("span",{className:o().text,children:"Log in"}),(0,n.jsx)("span",{className:o()["bottom-key-1"]}),(0,n.jsx)("span",{className:o()["bottom-key-2"]})]}),(0,n.jsxs)("button",{className:o().fancy2,onClick:e=>m(e),children:[(0,n.jsx)("span",{className:o()["top-key"]}),(0,n.jsx)("span",{className:o().text,children:"Demo login"}),(0,n.jsx)("span",{className:o()["bottom-key-1"]}),(0,n.jsx)("span",{className:o()["bottom-key-2"]})]}),(0,n.jsxs)("div",{className:"self-center text-sm",children:["Don't have an account?"," ",(0,n.jsx)("a",{href:"/signup",className:"underline",children:"Sign up"})]})]})})}},8460:function(e){e.exports={form:"components_form__3qN9n",message:"components_message__GHJrm",flex:"components_flex__ka1su",input:"components_input__4qcDk",input01:"components_input01__SkCds",fancy:"components_fancy__0NMLI",fancy2:"components_fancy2__iMr_f",text:"components_text__hh6Ly","top-key":"components_top-key__PvoL6","bottom-key-1":"components_bottom-key-1__EXuIY","bottom-key-2":"components_bottom-key-2__e2VCu"}},622:function(e,t,s){"use strict";var n=s(2265),a=Symbol.for("react.element"),o=Symbol.for("react.fragment"),r=Object.prototype.hasOwnProperty,l=n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,c={key:!0,ref:!0,__self:!0,__source:!0};function i(e,t,s){var n,o={},i=null,p=null;for(n in void 0!==s&&(i=""+s),void 0!==t.key&&(i=""+t.key),void 0!==t.ref&&(p=t.ref),t)r.call(t,n)&&!c.hasOwnProperty(n)&&(o[n]=t[n]);if(e&&e.defaultProps)for(n in t=e.defaultProps)void 0===o[n]&&(o[n]=t[n]);return{$$typeof:a,type:e,key:i,ref:p,props:o,_owner:l.current}}t.Fragment=o,t.jsx=i,t.jsxs=i},7437:function(e,t,s){"use strict";e.exports=s(622)},4033:function(e,t,s){e.exports=s(5313)}},function(e){e.O(0,[971,938,744],function(){return e(e.s=4930)}),_N_E=e.O()}]);