import{j as e,r as l,a as A}from"./react-2280e4eb.js";import{c as w}from"./react-dom-bef220fe.js";import{N as h,B as D}from"./react-router-dom-afc907cc.js";import{i as B,t as p}from"./i18next-44214ecc.js";import{B as P}from"./i18next-browser-languagedetector-b0260b6b.js";import{i as O,u as E}from"./react-i18next-cde0ce54.js";import{B as v,D as T,T as j,A as F}from"./@mui-b8b3feef.js";import{u as Q,Q as U,a as q}from"./react-query-f8a126e2.js";import{l as V}from"./lodash-a5d113ae.js";import{M as z,a as H,P as K,T as W}from"./react-leaflet-9b74568a.js";import{d as $,e as b}from"./react-router-8816cfc5.js";import"./hoist-non-react-statics-bdc259dc.js";import"./scheduler-04ce0582.js";import"./@remix-run-35d41228.js";import"./@babel-a9b1b4c8.js";import"./react-is-1aacdabe.js";import"./clsx-1229b3e0.js";import"./react-transition-group-db3204be.js";import"./@emotion-c3237677.js";import"./stylis-581c9ed0.js";import"./@popperjs-0e7ee0a2.js";import"./leaflet-eb94c854.js";import"./@react-leaflet-5ae66286.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerpolicy&&(o.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?o.credentials="include":r.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();const G={tag:" roller derby around the world",league_form_title:"Add a league",league_form_field_label_name:"nom de la ligue"},J={tag:"el roller derby en el mundo",league_form_title:"Añadir una ligua",league_form_field_label_name:"nombre de la ligua"},Z={tag:"le roller derby dans le monde",map_cockpit_button_add_new_league:"Créer une league",league_form_title:"Ajouter une ligue",league_form_field_label_name:"nom de la league",league_form_field_label_name_error_message:"Préciser un nom de league",league_form_field_label_city:"ville",league_form_field_label_name_error_city:"Préciser une ville",league_form_button_submit:"Créer cette league"},X={en:{translation:G},fr:{translation:Z},es:{translation:J}};B.use(O).use(P).init({compatibilityJSON:"v3",debug:!1,resources:X,fallbackLng:"en"});const Y=()=>{const n=a=>a?"navLinkActive":"navLink";return e.jsx("div",{className:"navBar",children:e.jsxs("div",{className:"navBarContainer",children:[e.jsx("br",{}),e.jsx(h,{className:({isActive:a})=>n(a),to:"/",children:"The Map"})," "," | ",e.jsx(h,{to:"/about",className:({isActive:a})=>n(a),children:"About"})," "," | ",e.jsx(h,{to:"/login",className:({isActive:a})=>n(a),children:"Login"}),e.jsx("br",{})]})})};const ee=[{id:"0001",name:"RD Nice",coordinates:[43.710175,7.261953]},{id:"0002",name:"RD Bordeaux",coordinates:[44.837788,-.57918]},{id:"0003",name:"RD Munich",coordinates:[48.135124,11.581981]},{id:"0004",name:"RD Brest",coordinates:[48.38987,-4.48718]},{id:"0005",name:"RD Madrid",coordinates:[40.4167,-3.7167]},{id:"0006",name:"RD Hull",coordinates:[42.2861,-70.8835]},{id:"0007",name:"RD Bergame",coordinates:[45.695,9.67]}],te=n=>{const{t:a}=E(),{openNewLeagueDrawer:s}=n;return e.jsx(v,{variant:"contained",onClick:()=>s(),children:a("map_cockpit_button_add_new_league")})};function ae(n){const a=Object.entries(n).flatMap(re).filter(ne).map(oe);return a.length!==0?"?"+a.join("&"):""}function re([n,a]){return Array.isArray(a)?a.map(s=>[n,s]):[[n,a]]}function ne([,n]){return["string","number","boolean"].includes(typeof n)}function oe([n,a]){return a==null?"":`${encodeURIComponent(n)}=${encodeURIComponent(a)}`}async function se(n){const{text:a}=n,r="https://api.geoapify.com/v1/geocode/autocomplete"+ae({apiKey:"7397b2a78025469fbab3271aed88f907",text:a,type:"city",lang:"fr",format:"json"});return await(await fetch(r)).json()}const ie=n=>{const{isOpen:a,onClose:s,addMarker:i}=n,[r,o]=l.useState(!1),[c,x]=l.useState(""),[u,f]=l.useState({placeId:"",label:"",city:""}),d=Q(["cities",u],()=>k({text:u.city}),{enabled:!1}),g=l.useMemo(()=>{if(d.data!=null)return d.data.results.find(t=>t.place_id===u.placeId)},[d.data,u.placeId]),L=t=>{f(t===null?{placeId:"",label:"",city:""}:m=>({...m,label:t,city:t}))},C=t=>f(t===null?{placeId:"",label:"",city:""}:()=>t),k=t=>{if(t.text.length>0)return se(t)},N=l.useCallback(V.debounce(()=>d.refetch(),500),[]);l.useEffect(()=>{N()},[u]);const M=()=>d.data?d.data.results.map(t=>({placeId:t.place_id,label:t.formatted,city:t.city})):[];function I(t){return{name:c,id:u.placeId,coordinates:[t.lat,t.lon]}}function y(){x(""),f({placeId:"",label:"",city:""}),o(!1),s()}const _=l.useMemo(()=>r?R():[],[c,u,g]);function R(){const t=[];return c===""&&t.push("leagueName"),u.label===""&&t.push("leagueLocation"),g==null&&t.push("cityQuery"),t}function S(){if(r||o(!0),d.data!=null&&_.length===0){const t=I(g);i(t),y()}}return e.jsx(T,{ModalProps:{disableScrollLock:!1},open:a,anchor:"left",onClose:y,children:e.jsxs("div",{className:"leagueDrawer",children:[e.jsx("header",{children:p("league_form_title")}),e.jsxs("form",{style:{display:"flex",flexDirection:"column",gap:"20px"},children:[e.jsx(j,{id:"name",className:"textField",label:p("league_form_field_label_name"),value:c,onChange:t=>x(t.target.value),InputLabelProps:{shrink:!0},error:_.includes("leagueName"),helperText:p("league_form_field_label_name_error_message")}),e.jsx(F,{id:"city_autocomplete",options:M(),getOptionLabel:t=>t.label,value:u,isOptionEqualToValue:(t,m)=>t.placeId===m.placeId,onInputChange:(t,m)=>L(m),onChange:(t,m)=>C(m),renderInput:t=>e.jsx(j,{...t,label:p("league_form_field_label_city"),error:_.includes("leagueLocation"),helperText:p("league_form_field_label_name_error_city")})})]}),e.jsx("div",{className:"actions",children:e.jsx(v,{variant:"contained",onClick:S,children:e.jsx("span",{children:p("league_form_button_submit")})})})]})})},le=()=>{const[n,a]=l.useState(!1),{markersList:s,addMarker:i}=ue(),r=()=>{a(!1)},o=()=>{a(!0)};return e.jsxs("div",{className:"theMap",children:[e.jsx("div",{className:"cockpit",children:e.jsx(te,{openNewLeagueDrawer:o})}),e.jsx("div",{className:"leafletContainer",children:e.jsx(ce,{markersList:s})}),e.jsx(ie,{isOpen:n,onClose:r,addMarker:i})]})},ce=n=>{const{markersList:a}=n,[s,i]=l.useState(null);return e.jsxs(z,{center:[47.4,7.7],zoom:5,scrollWheelZoom:!1,children:[a.map(r=>e.jsx(H,{position:r.coordinates,eventHandlers:{click:()=>{i(r.id)}},children:e.jsx(K,{children:r.name})},r.id)),e.jsx(W,{url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",attribution:'© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'})]})};function ue(){const[n,a]=l.useState([...ee]);return{markersList:n,addMarker:i=>{a(r=>[...r,i])}}}const de=()=>e.jsx("div",{children:"About"}),me=()=>e.jsx("div",{children:"Login"}),pe=new U;function fe(){return e.jsx(q,{client:pe,children:e.jsxs("div",{className:"app",children:[e.jsx(Y,{}),e.jsx(ge,{})]})})}const ge=()=>e.jsxs($,{children:[e.jsx(b,{path:"/",element:e.jsx(le,{})}),e.jsx(b,{path:"about",element:e.jsx(de,{})}),e.jsx(b,{path:"login",element:e.jsx(me,{})})]});w.createRoot(document.getElementById("root")).render(e.jsx(A.StrictMode,{children:e.jsx(D,{children:e.jsx(fe,{})})}));
