(()=>{var e={};e.id=2383,e.ids=[2383,196,4996],e.modules={72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},50524:(e,a,t)=>{"use strict";t.r(a),t.d(a,{GlobalError:()=>s.Z,__next_app__:()=>x,originalPathname:()=>c,pages:()=>d,routeModule:()=>u,tree:()=>o}),t(85247),t(29101),t(19718),t(31306),t(87824);var r=t(93282),l=t(5736),s=t(61249),i=t(36880),n={};for(let e in i)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(n[e]=()=>i[e]);t.d(a,n);let o=["",{children:["playground",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,85247)),"/workspace/packages/web/src/app/playground/page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(t.bind(t,29101)),"/workspace/packages/web/src/app/layout.tsx"],template:[()=>Promise.resolve().then(t.bind(t,19718)),"/workspace/packages/web/src/app/template.tsx"],error:[()=>Promise.resolve().then(t.bind(t,31306)),"/workspace/packages/web/src/app/error.tsx"],"not-found":[()=>Promise.resolve().then(t.t.bind(t,87824,23)),"next/dist/client/components/not-found-error"]}],d=["/workspace/packages/web/src/app/playground/page.tsx"],c="/playground/page",x={require:t,loadChunk:()=>Promise.resolve()},u=new r.AppPageRouteModule({definition:{kind:l.x.APP_PAGE,page:"/playground/page",pathname:"/playground",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:o}})},37069:(e,a,t)=>{Promise.resolve().then(t.bind(t,20267))},20267:(e,a,t)=>{"use strict";t.r(a),t.d(a,{default:()=>p});var r=t(73227),l=t(23677),s=t(11250),i=t(79580),n=t(24988),o=t(73038),d=t(66144),c=t(34996),x=t(50196),u=t(80188),m=t(45316);function p(){let[e,a]=(0,l.useState)(""),[t,p]=(0,l.useState)(`import { Settler } from "@settler/sdk";

const client = new Settler({
  apiKey: "${e||"sk_your_api_key"}",
});

// Create a reconciliation job
const job = await client.jobs.create({
  name: "Shopify-Stripe Reconciliation",
  source: {
    adapter: "shopify",
    config: {
      apiKey: process.env.SHOPIFY_API_KEY,
    },
  },
  target: {
    adapter: "stripe",
    config: {
      apiKey: process.env.STRIPE_SECRET_KEY,
    },
  },
  rules: {
    matching: [
      { field: "order_id", type: "exact" },
      { field: "amount", type: "exact", tolerance: 0.01 },
    ],
    conflictResolution: "last-wins",
  },
});

console.log("Job created:", job.data.id);

// Run the job and get report
const report = await client.jobs.run(job.data.id);
console.log("Report:", report.data.summary);
// {
//   total: 150,
//   matched: 145,
//   unmatched: 3,
//   conflicts: 2,
//   accuracy: 0.987
// }`),[g,h]=(0,l.useState)("// Click 'Run Code' to execute and see results here"),[b,f]=(0,l.useState)(!1),y=async()=>{f(!0),h("// Running...\n"),await new Promise(e=>{setTimeout(()=>{h(`✅ Job created: job_abc123xyz
📊 Report Summary:
   Total: 150
   Matched: 145
   Unmatched: 3
   Conflicts: 2
   Accuracy: 98.7%

🎉 Reconciliation completed successfully!`),f(!1),e()},1500)})},[j,v]=(0,l.useState)(!1),k=(0,l.useRef)(null);return(0,r.jsxs)(u.AnimatedPageWrapper,{"aria-label":"Interactive playground",children:[r.jsx(o.Navigation,{}),r.jsx(m.z,{badge:"Interactive Playground",title:"Try Settler Free for 30 Days",description:"Test our platform with real examples. No credit card required. Get full access to all features."}),r.jsx("section",{ref:k,className:"py-12 px-4 sm:px-6 lg:px-8","aria-labelledby":"playground-heading",children:(0,r.jsxs)("div",{className:"max-w-7xl mx-auto",children:[r.jsx("h2",{id:"playground-heading",className:"sr-only",children:"Interactive Playground"}),(0,r.jsxs)(i.Zb,{className:`
              bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 mb-6
              transition-all duration-700
              ${j?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}
            `,role:"region","aria-labelledby":"api-config-heading",children:[(0,r.jsxs)(i.Ol,{children:[r.jsx(i.ll,{id:"api-config-heading",className:"text-slate-900 dark:text-white",children:"API Configuration"}),r.jsx(i.SZ,{className:"text-slate-600 dark:text-slate-300",children:"Enter your API key to test with real credentials, or leave empty for demo mode"})]}),r.jsx(i.aY,{children:(0,r.jsxs)("div",{className:"flex gap-4",children:[r.jsx("input",{type:"text",value:e,onChange:e=>{a(e.target.value),p(t.replace(/sk_your_api_key/g,e.target.value||"sk_your_api_key"))},placeholder:"sk_your_api_key",className:"flex-1 px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm","aria-label":"API key input"}),r.jsx(s.z,{onClick:y,disabled:b,className:"bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 transition-all transform hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2","aria-label":b?"Running code":"Run code",children:b?"Running...":"Run Code"})]})})]}),(0,r.jsxs)("div",{className:`
              grid grid-cols-1 lg:grid-cols-2 gap-6
              transition-all duration-700
              ${j?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}
            `,style:{transitionDelay:"200ms"},children:[(0,r.jsxs)(i.Zb,{className:"bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 transition-all duration-300 hover:shadow-lg",role:"region","aria-labelledby":"editor-heading",children:[(0,r.jsxs)(i.Ol,{children:[(0,r.jsxs)("div",{className:"flex items-center justify-between",children:[r.jsx(i.ll,{id:"editor-heading",className:"text-slate-900 dark:text-white",children:"Code Editor"}),r.jsx(n.C,{className:"bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",children:"TypeScript"})]}),r.jsx(i.SZ,{className:"text-slate-600 dark:text-slate-300",children:"Edit the code below to experiment with the Settler API"})]}),r.jsx(i.aY,{children:r.jsx("textarea",{value:t,onChange:e=>p(e.target.value),className:"w-full h-[500px] p-4 font-mono text-sm border border-slate-300 dark:border-slate-700 rounded-md bg-slate-900 dark:bg-slate-950 text-green-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none",spellCheck:!1,"aria-label":"Code editor"})})]}),(0,r.jsxs)(i.Zb,{className:"bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 transition-all duration-300 hover:shadow-lg",role:"region","aria-labelledby":"output-heading","aria-live":"polite",children:[(0,r.jsxs)(i.Ol,{children:[(0,r.jsxs)("div",{className:"flex items-center justify-between",children:[r.jsx(i.ll,{id:"output-heading",className:"text-slate-900 dark:text-white",children:"Output"}),r.jsx(n.C,{className:"bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",children:"Console"})]}),r.jsx(i.SZ,{className:"text-slate-600 dark:text-slate-300",children:"Results and logs from your code execution"})]}),r.jsx(i.aY,{children:r.jsx("div",{className:"w-full h-[500px] p-4 bg-slate-900 dark:bg-slate-950 text-green-400 font-mono text-sm rounded-md overflow-auto border border-slate-300 dark:border-slate-700",role:"log","aria-label":"Code execution output",children:r.jsx("pre",{className:"whitespace-pre-wrap",children:g})})})]})]}),r.jsx("div",{className:`
              mt-8
              transition-all duration-700
              ${j?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}
            `,style:{transitionDelay:"400ms"},children:(0,r.jsxs)(i.Zb,{className:"bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 transition-all duration-300 hover:shadow-lg",role:"region","aria-labelledby":"examples-heading",children:[(0,r.jsxs)(i.Ol,{children:[r.jsx(i.ll,{id:"examples-heading",className:"text-slate-900 dark:text-white",children:"Quick Examples"}),r.jsx(i.SZ,{className:"text-slate-600 dark:text-slate-300",children:"Try these pre-configured examples"})]}),r.jsx(i.aY,{children:(0,r.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-4",role:"list","aria-label":"Quick example templates",children:[r.jsx(s.z,{variant:"outline",onClick:()=>{p(`import { Settler } from "@settler/sdk";

const client = new Settler({
  apiKey: "${e||"sk_your_api_key"}",
});

// QuickBooks to Stripe reconciliation
const job = await client.jobs.create({
  name: "QuickBooks-Stripe",
  source: { adapter: "quickbooks", config: { apiKey: "..." } },
  target: { adapter: "stripe", config: { apiKey: "..." } },
  rules: {
    matching: [
      { field: "transaction_id", type: "exact" },
      { field: "amount", type: "exact", tolerance: 0.01 }
    ]
  }
});

const report = await client.jobs.run(job.data.id);
console.log(report.data.summary);`)},className:"h-auto py-4 text-left transition-all transform hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",role:"listitem","aria-label":"Load QuickBooks to Stripe example",children:(0,r.jsxs)("div",{children:[r.jsx("div",{className:"font-semibold mb-1",children:"QuickBooks → Stripe"}),r.jsx("div",{className:"text-xs text-slate-500 dark:text-slate-400",children:"Accounting to payments"})]})}),r.jsx(s.z,{variant:"outline",onClick:()=>{p(`import { Settler } from "@settler/sdk";

const client = new Settler({
  apiKey: "${e||"sk_your_api_key"}",
});

// PayPal to Shopify reconciliation
const job = await client.jobs.create({
  name: "PayPal-Shopify",
  source: { adapter: "paypal", config: { apiKey: "..." } },
  target: { adapter: "shopify", config: { apiKey: "..." } },
  rules: {
    matching: [
      { field: "order_id", type: "exact" },
      { field: "amount", type: "exact", tolerance: 0.01 },
      { field: "date", type: "range", days: 1 }
    ]
  }
});

const report = await client.jobs.run(job.data.id);
console.log(report.data.summary);`)},className:"h-auto py-4 text-left transition-all transform hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",role:"listitem","aria-label":"Load PayPal to Shopify example",children:(0,r.jsxs)("div",{children:[r.jsx("div",{className:"font-semibold mb-1",children:"PayPal → Shopify"}),r.jsx("div",{className:"text-xs text-slate-500 dark:text-slate-400",children:"Payment to e-commerce"})]})}),r.jsx(s.z,{variant:"outline",onClick:()=>{p(`import { Settler } from "@settler/sdk";

const client = new Settler({
  apiKey: "${e||"sk_your_api_key"}",
});

// Real-time webhook reconciliation
const job = await client.jobs.create({
  name: "Real-time Webhook Sync",
  source: { adapter: "webhook", config: { endpoint: "..." } },
  target: { adapter: "stripe", config: { apiKey: "..." } },
  rules: {
    matching: [{ field: "id", type: "exact" }],
    realtime: true
  }
});

// Listen for webhook events
client.webhooks.on("reconciliation.complete", (event) => {
  console.log("Reconciliation complete:", event.data);
});`)},className:"h-auto py-4 text-left transition-all transform hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",role:"listitem","aria-label":"Load real-time webhooks example",children:(0,r.jsxs)("div",{children:[r.jsx("div",{className:"font-semibold mb-1",children:"Real-time Webhooks"}),r.jsx("div",{className:"text-xs text-slate-500 dark:text-slate-400",children:"Live event reconciliation"})]})})]})})]})})]})}),r.jsx("section",{className:"py-12 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-slate-800/50",children:(0,r.jsxs)("div",{className:"max-w-7xl mx-auto",children:[r.jsx("div",{className:"text-center mb-8",children:r.jsx("h2",{className:"text-2xl font-bold mb-4 text-slate-900 dark:text-white",children:"Secure & Reliable"})}),r.jsx(x.TrustBadges,{})]})}),r.jsx("section",{className:"py-20 px-4 sm:px-6 lg:px-8",children:r.jsx("div",{className:"max-w-4xl mx-auto",children:r.jsx(c.ConversionCTA,{title:"Ready to Start Your Free Trial?",description:"Get full access for 30 days. No credit card required. Start matching transactions in minutes.",primaryAction:"Start 30-Day Free Trial",primaryLink:"/signup",secondaryAction:"View Pricing",secondaryLink:"/pricing",variant:"gradient"})})}),r.jsx(d.$,{})]})}},45316:(e,a,t)=>{"use strict";t.d(a,{z:()=>n});var r=t(73227),l=t(23677),s=t(24988),i=t(18755);function n({badge:e,title:a,description:t,className:n=""}){let[o,d]=(0,l.useState)(!1),c=o?"opacity-100 translate-y-0":"opacity-0 translate-y-4";return(0,r.jsxs)("section",{className:`relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden ${n}`,"aria-labelledby":"hero-heading",children:[r.jsx("div",{className:"absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-800 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10","aria-hidden":"true"}),(0,r.jsxs)("div",{className:"max-w-7xl mx-auto text-center",children:[e&&r.jsx(s.C,{className:`mb-6 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800 transition-all duration-300 ${c}`,"aria-label":"Page category badge",children:e}),r.jsx("h1",{id:"hero-heading",className:(0,i.cn)("text-5xl md:text-7xl font-bold mb-6","bg-gradient-to-r from-primary-600 via-electric-indigo to-electric-purple","bg-clip-text text-transparent","transition-all duration-300",c),style:{transitionDelay:"100ms"},children:a}),r.jsx("p",{className:(0,i.cn)("text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto","transition-all duration-300",c),style:{transitionDelay:"150ms"},children:t})]})]})}},80188:(e,a,t)=>{"use strict";t.d(a,{AnimatedPageWrapper:()=>s});var r=t(73227);t(23677);var l=t(18755);function s({children:e,className:a="","aria-label":t}){return(0,r.jsxs)(r.Fragment,{children:[r.jsx("a",{href:"#main-content",className:"skip-to-main","aria-label":"Skip to main content",children:"Skip to main content"}),r.jsx("div",{id:"main-content",className:(0,l.cn)("min-h-screen","bg-gradient-to-br from-background via-primary-50/50 to-electric-indigo/10","dark:from-background dark:via-background dark:to-background",a),role:"main","aria-label":t||"Page content",children:e})]})}},34996:(e,a,t)=>{"use strict";t.r(a),t.d(a,{ConversionCTA:()=>o});var r=t(73227),l=t(20649),s=t(11250),i=t(79580),n=t(18755);function o({title:e="Ready to Get Started?",description:a="Start reconciling your data in minutes. No credit card required.",primaryAction:t="Start Free Trial",primaryLink:o="/playground",secondaryAction:d="View Pricing",secondaryLink:c="/pricing",variant:x="gradient"}){return"minimal"===x?(0,r.jsxs)("div",{className:"text-center py-12",role:"region","aria-labelledby":"cta-title",children:[r.jsx("h3",{id:"cta-title",className:"text-2xl font-bold mb-4 text-foreground",children:e}),r.jsx("p",{className:"text-muted-foreground mb-6 max-w-2xl mx-auto",children:a}),(0,r.jsxs)("div",{className:"flex flex-col sm:flex-row gap-4 justify-center",role:"group","aria-label":"Call to action buttons",children:[r.jsx(s.z,{asChild:!0,size:"lg",variant:"default",children:r.jsx(l.default,{href:o,"aria-label":t,children:t})}),d&&r.jsx(s.z,{asChild:!0,size:"lg",variant:"outline",children:r.jsx(l.default,{href:c,"aria-label":d,children:d})})]})]}):"gradient"===x?(0,r.jsxs)(i.Zb,{className:(0,n.cn)("bg-gradient-to-r from-primary-600 to-electric-indigo","border-0 shadow-2xl","transition-all duration-500 hover:shadow-3xl"),elevation:"lg",role:"region","aria-labelledby":"cta-title",children:[(0,r.jsxs)(i.Ol,{className:"text-center",children:[r.jsx(i.ll,{id:"cta-title",className:"text-3xl md:text-4xl text-white mb-4",children:e}),r.jsx(i.SZ,{className:"text-primary-100 text-lg",children:a})]}),r.jsx(i.aY,{className:"text-center",children:(0,r.jsxs)("div",{className:"flex flex-col sm:flex-row gap-4 justify-center",role:"group","aria-label":"Call to action buttons",children:[r.jsx(s.z,{size:"lg",variant:"secondary",asChild:!0,className:"bg-white text-primary-600 hover:bg-primary-50",children:r.jsx(l.default,{href:o,"aria-label":t,children:t})}),d&&r.jsx(s.z,{size:"lg",variant:"outline",asChild:!0,className:"border-2 border-white text-white hover:bg-white/10",children:r.jsx(l.default,{href:c,"aria-label":d,children:d})})]})})]}):(0,r.jsxs)(i.Zb,{elevation:"lg",hover:!0,role:"region","aria-labelledby":"cta-title",children:[(0,r.jsxs)(i.Ol,{className:"text-center",children:[r.jsx(i.ll,{id:"cta-title",className:"text-2xl md:text-3xl mb-2",children:e}),r.jsx(i.SZ,{children:a})]}),r.jsx(i.aY,{className:"text-center",children:(0,r.jsxs)("div",{className:"flex flex-col sm:flex-row gap-4 justify-center",role:"group","aria-label":"Call to action buttons",children:[r.jsx(s.z,{size:"lg",asChild:!0,variant:"default",children:r.jsx(l.default,{href:o,"aria-label":t,children:t})}),d&&r.jsx(s.z,{size:"lg",variant:"outline",asChild:!0,children:r.jsx(l.default,{href:c,"aria-label":d,children:d})})]})})]})}},50196:(e,a,t)=>{"use strict";t.r(a),t.d(a,{TrustBadges:()=>s});var r=t(73227),l=t(23677);function s(){let[e,a]=(0,l.useState)(!1),t=(0,l.useRef)(null);return r.jsx("div",{ref:t,className:"flex flex-wrap items-center justify-center gap-6 py-8",role:"list","aria-label":"Trust badges and certifications",children:[{name:"SOC 2 Type II",icon:"\uD83D\uDD12"},{name:"GDPR Compliant",icon:"\uD83D\uDEE1️"},{name:"PCI-DSS Ready",icon:"\uD83D\uDCB3"},{name:"99.99% Uptime",icon:"⚡"}].map((a,t)=>(0,r.jsxs)("div",{className:`
            flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm
            transition-all duration-500
            ${e?"opacity-100 translate-y-0 scale-100":"opacity-0 translate-y-4 scale-95"}
            hover:shadow-lg hover:scale-105
          `,style:{transitionDelay:`${100*t}ms`},role:"listitem","aria-label":a.name,children:[r.jsx("span",{className:"text-2xl","aria-hidden":"true",children:a.icon}),r.jsx("span",{className:"text-sm font-medium text-slate-700 dark:text-slate-300",children:a.name})]},t))})}},24988:(e,a,t)=>{"use strict";t.d(a,{C:()=>i});var r=t(73227),l=t(23677),s=t(18755);let i=l.forwardRef(({className:e,variant:a="default",size:t="default",...l},i)=>r.jsx("div",{ref:i,className:(0,s.cn)("inline-flex items-center rounded-full border font-semibold","transition-colors","focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",{default:"border-transparent bg-primary-600 text-white hover:bg-primary-700",secondary:"border-transparent bg-muted text-muted-foreground hover:bg-muted/80",destructive:"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border-border text-foreground bg-transparent hover:bg-accent",success:"border-transparent bg-green-600 text-white hover:bg-green-700",warning:"border-transparent bg-yellow-600 text-white hover:bg-yellow-700"}[a],{sm:"px-1.5 py-0.5 text-xs",default:"px-2.5 py-0.5 text-xs",lg:"px-3 py-1 text-sm"}[t],e),...l}));i.displayName="Badge"},79580:(e,a,t)=>{"use strict";t.d(a,{Ol:()=>n,SZ:()=>d,Zb:()=>i,aY:()=>c,ll:()=>o});var r=t(73227),l=t(23677),s=t(18755);let i=l.forwardRef(({className:e,children:a,elevation:t="default",hover:l=!1,...i},n)=>r.jsx("div",{ref:n,className:(0,s.cn)("rounded-lg border bg-card text-card-foreground","transition-shadow duration-200 ease-out","motion-reduce:transition-none",{none:"",sm:"shadow-sm",default:"shadow-md",lg:"shadow-lg"}[t],l&&"hover:shadow-lg cursor-pointer",e),...i,children:a}));i.displayName="Card";let n=l.forwardRef(({className:e,children:a,...t},l)=>r.jsx("div",{ref:l,className:(0,s.cn)("flex flex-col space-y-1.5 p-6",e),...t,children:a}));n.displayName="CardHeader";let o=l.forwardRef(({className:e,children:a,...t},l)=>r.jsx("h3",{ref:l,className:(0,s.cn)("text-2xl font-semibold leading-none tracking-tight",e),...t,children:a}));o.displayName="CardTitle";let d=l.forwardRef(({className:e,children:a,...t},l)=>r.jsx("p",{ref:l,className:(0,s.cn)("text-sm text-muted-foreground",e),...t,children:a}));d.displayName="CardDescription";let c=l.forwardRef(({className:e,children:a,...t},l)=>r.jsx("div",{ref:l,className:(0,s.cn)("p-6 pt-0",e),...t,children:a}));c.displayName="CardContent",l.forwardRef(({className:e,children:a,...t},l)=>r.jsx("div",{ref:l,className:(0,s.cn)("flex items-center p-6 pt-0",e),...t,children:a})).displayName="CardFooter"},85247:(e,a,t)=>{"use strict";t.r(a),t.d(a,{default:()=>r});let r=(0,t(53189).createProxy)(String.raw`/workspace/packages/web/src/app/playground/page.tsx#default`)}};var a=require("../../webpack-runtime.js");a.C(e);var t=e=>a(a.s=e),r=a.X(0,[4522,2631,6568,3010,8467],()=>t(50524));module.exports=r})();