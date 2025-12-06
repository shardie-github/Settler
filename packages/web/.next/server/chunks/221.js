"use strict";exports.id=221,exports.ids=[221],exports.modules={11045:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.config=void 0;var r=a(27184);Object.defineProperty(t,"config",{enumerable:!0,get:function(){return r.validatedConfig}})},27184:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.validatedConfig=t.env=void 0;let r=a(93665);if(t.env=(0,r.cleanEnv)(process.env,{NODE_ENV:(0,r.str)({choices:["development","test","production","staging","preview"],default:"development"}),PORT:(0,r.port)({default:3e3}),HOST:(0,r.host)({default:"0.0.0.0"}),DB_HOST:(0,r.host)({default:"localhost"}),DB_PORT:(0,r.port)({default:5432}),DB_NAME:(0,r.str)({default:"settler"}),DB_USER:(0,r.str)({default:"postgres"}),DB_PASSWORD:(0,r.str)({devDefault:"postgres"}),DB_SSL:(0,r.bool)({default:!1}),DB_POOL_MIN:(0,r.num)({default:5}),DB_POOL_MAX:(0,r.num)({default:20}),DB_CONNECTION_TIMEOUT:(0,r.num)({default:2e3}),DB_STATEMENT_TIMEOUT:(0,r.num)({default:3e4}),REDIS_HOST:(0,r.host)({default:"localhost"}),REDIS_PORT:(0,r.port)({default:6379}),REDIS_URL:(0,r.url)({default:void 0}),REDIS_PASSWORD:(0,r.str)({default:void 0}),REDIS_TLS:(0,r.bool)({default:!1}),JWT_SECRET:(0,r.str)({devDefault:"dev-secret-change-in-production",desc:"Secret key for JWT token signing"}),JWT_ACCESS_EXPIRY:(0,r.str)({default:"15m"}),JWT_REFRESH_EXPIRY:(0,r.str)({default:"7d"}),JWT_REFRESH_SECRET:(0,r.str)({devDefault:void 0,desc:"Optional separate secret for refresh tokens"}),ENCRYPTION_KEY:(0,r.str)({devDefault:"dev-encryption-key-32-chars-long!!",desc:"32-byte key for AES-256-GCM encryption"}),RATE_LIMIT_DEFAULT:(0,r.num)({default:1e3}),RATE_LIMIT_WINDOW_MS:(0,r.num)({default:9e5}),WEBHOOK_MAX_RETRIES:(0,r.num)({default:5}),WEBHOOK_INITIAL_DELAY:(0,r.num)({default:2e3}),WEBHOOK_MAX_DELAY:(0,r.num)({default:32e3}),DATA_RETENTION_DAYS:(0,r.num)({default:365}),ALLOWED_ORIGINS:(0,r.str)({default:"*",desc:"Comma-separated list of allowed origins"}),LOG_LEVEL:(0,r.str)({choices:["error","warn","info","debug"],default:"info"}),LOG_SAMPLING_RATE:(0,r.num)({default:1}),SERVICE_NAME:(0,r.str)({default:"settler-api"}),OTLP_ENDPOINT:(0,r.url)({default:void 0}),JAEGER_ENDPOINT:(0,r.url)({default:void 0}),SENTRY_DSN:(0,r.url)({default:void 0}),SENTRY_ENVIRONMENT:(0,r.str)({default:void 0}),SENTRY_TRACES_SAMPLE_RATE:(0,r.num)({default:.1}),ENABLE_SCHEMA_PER_TENANT:(0,r.bool)({default:!1}),ENABLE_REQUEST_TIMEOUT:(0,r.bool)({default:!0}),ENABLE_API_DOCS:(0,r.bool)({default:!0}),DEPLOYMENT_ENV:(0,r.str)({choices:["local","staging","production"],default:"local"}),TRUST_PROXY:(0,r.bool)({default:!1}),SECURE_COOKIES:(0,r.bool)({default:!1}),METRICS_ENABLED:(0,r.bool)({default:!0}),HEALTH_CHECK_ENABLED:(0,r.bool)({default:!0})}),"production"===t.env.NODE_ENV||"preview"===t.env.NODE_ENV){if(!t.env.ENCRYPTION_KEY||32!==t.env.ENCRYPTION_KEY.length)throw Error(`ENCRYPTION_KEY must be exactly 32 characters in ${t.env.NODE_ENV}`);if(!t.env.JWT_SECRET||"dev-secret-change-in-production"===t.env.JWT_SECRET)throw Error(`JWT_SECRET must be set to a secure random value in ${t.env.NODE_ENV}`);"*"===t.env.ALLOWED_ORIGINS&&console.warn(`WARNING: CORS allows all origins in ${t.env.NODE_ENV}. Consider restricting ALLOWED_ORIGINS.`)}t.validatedConfig={nodeEnv:t.env.NODE_ENV,port:t.env.PORT,host:t.env.HOST,database:{host:t.env.DB_HOST,port:t.env.DB_PORT,name:t.env.DB_NAME,user:t.env.DB_USER,password:t.env.DB_PASSWORD,ssl:t.env.DB_SSL,poolMin:t.env.DB_POOL_MIN,poolMax:t.env.DB_POOL_MAX,connectionTimeout:t.env.DB_CONNECTION_TIMEOUT,statementTimeout:t.env.DB_STATEMENT_TIMEOUT},redis:{host:t.env.REDIS_HOST,port:t.env.REDIS_PORT,url:t.env.REDIS_URL,password:t.env.REDIS_PASSWORD,tls:t.env.REDIS_TLS},jwt:{secret:t.env.JWT_SECRET,accessTokenExpiry:t.env.JWT_ACCESS_EXPIRY,refreshTokenExpiry:t.env.JWT_REFRESH_EXPIRY,refreshSecret:t.env.JWT_REFRESH_SECRET||t.env.JWT_SECRET},encryption:{key:t.env.ENCRYPTION_KEY},rateLimiting:{defaultLimit:t.env.RATE_LIMIT_DEFAULT,windowMs:t.env.RATE_LIMIT_WINDOW_MS},webhook:{maxRetries:t.env.WEBHOOK_MAX_RETRIES,initialDelay:t.env.WEBHOOK_INITIAL_DELAY,maxDelay:t.env.WEBHOOK_MAX_DELAY},dataRetention:{defaultDays:t.env.DATA_RETENTION_DAYS},allowedOrigins:t.env.ALLOWED_ORIGINS.split(",").map(e=>e.trim()),logging:{level:t.env.LOG_LEVEL,samplingRate:t.env.LOG_SAMPLING_RATE},observability:{serviceName:t.env.SERVICE_NAME,otlpEndpoint:t.env.OTLP_ENDPOINT,jaegerEndpoint:t.env.JAEGER_ENDPOINT},sentry:{dsn:t.env.SENTRY_DSN,environment:t.env.SENTRY_ENVIRONMENT||t.env.NODE_ENV,tracesSampleRate:t.env.SENTRY_TRACES_SAMPLE_RATE},features:{enableSchemaPerTenant:t.env.ENABLE_SCHEMA_PER_TENANT,enableRequestTimeout:t.env.ENABLE_REQUEST_TIMEOUT,enableApiDocs:t.env.ENABLE_API_DOCS},deployment:{env:t.env.DEPLOYMENT_ENV},security:{trustProxy:t.env.TRUST_PROXY,secureCookies:t.env.SECURE_COOKIES},monitoring:{metricsEnabled:t.env.METRICS_ENABLED,healthCheckEnabled:t.env.HEALTH_CHECK_ENABLED}}},70058:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.sendTrialWelcomeEmail=o,t.sendTrialValueEmail=s,t.sendTrialGatedFeaturesEmail=d,t.sendTrialCaseStudyEmail=u,t.sendTrialComparisonEmail=c,t.sendTrialUrgencyEmail=m,t.sendTrialEndedEmail=p,t.sendPaidWelcomeEmail=_,t.sendMonthlySummaryEmail=f,t.sendLowActivityEmail=E;let r=a(67894),i=a(5383),n=a(43863);function l(e){let t=(0,i.getDefaultUrls)(),a={...e},r={};t?.product_name!==void 0&&(r.product_name=t.product_name),t?.upgrade_url!==void 0&&(r.upgrade_url=t.upgrade_url),t?.dashboard_url!==void 0&&(r.dashboard_url=t.dashboard_url),t?.support_url!==void 0&&(r.support_url=t.support_url),t?.pricing_url!==void 0&&(r.pricing_url=t.pricing_url),t?.docs_url!==void 0&&(r.docs_url=t.docs_url),t?.playground_url!==void 0&&(r.playground_url=t.playground_url),t?.cookbooks_url!==void 0&&(r.cookbooks_url=t.cookbooks_url);let n={};return t?.profile_setup_url!==void 0&&(n.profile_setup_url=t.profile_setup_url),t?.demo_url!==void 0&&(n.demo_url=t.demo_url),t?.free_tier_url!==void 0&&(n.free_tier_url=t.free_tier_url),t?.free_tier_info_url!==void 0&&(n.free_tier_info_url=t.free_tier_info_url),t?.consultation_url!==void 0&&(n.consultation_url=t.consultation_url),t?.insights_url!==void 0&&(n.insights_url=t.insights_url),a.product=r,a.urls=n,a}async function o(e,t){try{let a=e.firstName||e.email.split("@")[0]||"User",n=new Date(t.trialEndDate),o=isNaN(n.getTime())?void 0:new Date(n.getTime()+2592e6).toISOString().split("T")[0],s={trial_end_date:t.trialEndDate,trial_start_date:t.trialStartDate,days_remaining:t.daysRemaining};o&&(s.charge_date=o);let d=l({user:{first_name:a,email:e.email,...e.industry&&{industry:e.industry},...e.companyName&&{company_name:e.companyName},plan_type:e.planType||"trial"},trial:s}),u=await (0,i.renderEmailTemplate)("trial_welcome",d),c=(0,i.generatePlainText)(u);return(0,r.sendEmail)({to:e.email,subject:"Welcome to Settler! \uD83C\uDF89",html:u,text:c,tags:[{name:"email_type",value:"trial_welcome"}]})}catch(t){return(0,n.logError)("Failed to send trial welcome email",t,{user:e.email}),null}}async function s(e,t,a){try{let n=e.firstName||e.email.split("@")[0]||"User",o=l({user:{first_name:n,email:e.email},trial:{days_remaining:t.daysRemaining},reconciliation:{platform_name:a.platformName,matched_count:a.matchedCount,unmatched_count:a.unmatchedCount,time_saved:a.timeSaved,report_url:a.reportUrl}}),s=await (0,i.renderEmailTemplate)("trial_day2",o),d=(0,i.generatePlainText)(s);return(0,r.sendEmail)({to:e.email,subject:"Your first reconciliation is ready! \uD83C\uDF89",html:s,text:d,tags:[{name:"email_type",value:"trial_value"}]})}catch(t){return(0,n.logError)("Failed to send trial value email",t,{user:e.email}),null}}async function d(e,t){try{let a={user:{first_name:e.firstName||e.email.split("@")[0]||"User",email:e.email},trial:{days_remaining:t.daysRemaining}},n=await (0,i.renderEmailTemplate)("trial_day7",a),l=(0,i.generatePlainText)(n);return(0,r.sendEmail)({to:e.email,subject:"Unlock advanced features (still free for 23 days)",html:n,text:l,tags:[{name:"email_type",value:"trial_gated_features"}]})}catch(t){return(0,n.logError)("Failed to send trial gated features email",t,{user:e.email}),null}}async function u(e,t,a){try{let n=(0,i.getDefaultUrls)(),l={user:{first_name:e.firstName||e.email.split("@")[0]||"User",email:e.email,...e.industry&&{industry:e.industry}},trial:{days_remaining:t.daysRemaining},case_study:{similar_company:a.companyName,case_study_url:a.caseStudyUrl,case_studies_url:`${n?.docs_url||"https://docs.settler.dev"}/case-studies`}},o=await (0,i.renderEmailTemplate)("trial_day14",l),s=(0,i.generatePlainText)(o);return(0,r.sendEmail)({to:e.email,subject:`How ${a.companyName} saved 15 hours/week with Settler`,html:o,text:s,tags:[{name:"email_type",value:"trial_case_study"}]})}catch(t){return(0,n.logError)("Failed to send trial case study email",t,{user:e.email}),null}}async function c(e,t){try{let a={user:{first_name:e.firstName||e.email.split("@")[0]||"User",email:e.email},trial:{days_remaining:t.daysRemaining}},n=await (0,i.renderEmailTemplate)("trial_day21",a),l=(0,i.generatePlainText)(n);return(0,r.sendEmail)({to:e.email,subject:"Here's what you're missing (9 days left)",html:n,text:l,tags:[{name:"email_type",value:"trial_comparison"}]})}catch(t){return(0,n.logError)("Failed to send trial comparison email",t,{user:e.email}),null}}async function m(e,t,a){try{let n={user:{first_name:e.firstName||e.email.split("@")[0]||"User",email:e.email},trial:(()=>{let e=new Date(t.trialEndDate),a=isNaN(e.getTime())?void 0:new Date(e.getTime()+2592e6).toISOString().split("T")[0],r={trial_end_date:t.trialEndDate,days_remaining:t.daysRemaining};return a&&(r.charge_date=a),r})()},l=`trial_day${a}`,o=await (0,i.renderEmailTemplate)(l,n),s=(0,i.generatePlainText)(o);return(0,r.sendEmail)({to:e.email,subject:{27:"⏰ Your trial ends in 3 days",28:"Last chance: Trial ends tomorrow",29:"Final reminder: Trial ends today"}[a],html:o,text:s,tags:[{name:"email_type",value:`trial_urgency_day${a}`}]})}catch(t){return(0,n.logError)("Failed to send trial urgency email",t,{user:e.email,day:a}),null}}async function p(e){try{let t={user:{first_name:e.firstName||e.email.split("@")[0]||"User",email:e.email}},a=await (0,i.renderEmailTemplate)("trial_ended",t),n=(0,i.generatePlainText)(a);return(0,r.sendEmail)({to:e.email,subject:"Your trial has ended - Choose your plan",html:a,text:n,tags:[{name:"email_type",value:"trial_ended"}]})}catch(t){return(0,n.logError)("Failed to send trial ended email",t,{user:e.email}),null}}async function _(e){try{let t={user:{first_name:e.firstName||e.email.split("@")[0]||"User",email:e.email}},a=await (0,i.renderEmailTemplate)("paid_welcome",t),n=(0,i.generatePlainText)(a);return(0,r.sendEmail)({to:e.email,subject:"Welcome to Commercial! \uD83C\uDF89",html:a,text:n,tags:[{name:"email_type",value:"paid_welcome"}]})}catch(t){return(0,n.logError)("Failed to send paid welcome email",t,{user:e.email}),null}}async function f(e,t){try{let a=new Date().toLocaleString("en-US",{month:"long"}),n={user:{first_name:e.firstName||e.email.split("@")[0]||"User",email:e.email},monthly:{month:a},metrics:{total_reconciliations:t.totalReconciliations,accuracy:t.accuracy,time_saved:t.timeSaved,jobs_created:t.jobsCreated},recommendations:{...t.topInsight1&&{top_insight_1:t.topInsight1},...t.topInsight2&&{top_insight_2:t.topInsight2},...t.recommendation1&&{recommendation_1:t.recommendation1},...t.recommendation2&&{recommendation_2:t.recommendation2}}},l=await (0,i.renderEmailTemplate)("monthly_summary",n),o=(0,i.generatePlainText)(l);return(0,r.sendEmail)({to:e.email,subject:`${e.firstName||"You"}, your ${a} summary`,html:l,text:o,tags:[{name:"email_type",value:"monthly_summary"}]})}catch(t){return(0,n.logError)("Failed to send monthly summary email",t,{user:e.email}),null}}async function E(e){try{let t={user:{first_name:e.firstName||e.email.split("@")[0]||"User",email:e.email}},a=await (0,i.renderEmailTemplate)("low_activity",t),n=(0,i.generatePlainText)(a);return(0,r.sendEmail)({to:e.email,subject:`${e.firstName||"We"} miss you`,html:a,text:n,tags:[{name:"email_type",value:"low_activity"}]})}catch(t){return(0,n.logError)("Failed to send low activity email",t,{user:e.email}),null}}},5383:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.renderEmailTemplate=o,t.generatePlainText=function(e){let t,a=e.replace(/<style[^>]*>.*?<\/style>/gis,"").replace(/<script[^>]*>.*?<\/script>/gis,"").replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\s+/g," ").trim(),r=/<a[^>]+href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gi;for(;null!==(t=r.exec(e));){if(!t||!t[1]||!t[2])continue;let e=t[1],r=t[2].replace(/<[^>]+>/g,"");a=a.replace(r,`${r} (${e})`)}return a},t.getDefaultUrls=function(){let e=process.env.APP_URL||process.env.VERCEL_URL?`https://${process.env.VERCEL_URL}`:"https://app.settler.dev";return{product_name:"Settler",upgrade_url:`${e}/pricing`,dashboard_url:`${e}/dashboard`,support_url:`${e}/support`,pricing_url:`${e}/pricing`,docs_url:`${e}/docs`,playground_url:`${e}/playground`,cookbooks_url:`${e}/cookbooks`,profile_setup_url:`${e}/dashboard?setup=profile`,demo_url:`${e}/playground?demo=true`,free_tier_url:`${e}/pricing#free`,free_tier_info_url:`${e}/pricing#free`,consultation_url:`${e}/support?book=consultation`,insights_url:`${e}/dashboard/insights`}};let r=a(92048),i=a(55315),n=a(43863);function l(e,t){let a=(e,t="")=>{let r={};for(let i in e)e[i]&&"object"==typeof e[i]&&!Array.isArray(e[i])?Object.assign(r,a(e[i],`${t}${i}.`)):r[`${t}${i}`]=e[i];return r},r=a(t);return e.replace(/\{\{([^}]+)\}\}/g,(e,a)=>{let i=r[a]??t[a];return null==i?((0,n.logWarn)(`Email template field not found: ${a}`),e):String(i)})}async function o(e,t){let a=function(e){let t=function(e){try{let t=(0,i.join)(process.cwd(),"emails","lifecycle",`${e}.html`);try{return(0,r.readFileSync)(t,"utf8")}catch{let t=(0,i.join)(process.cwd(),"emails",`${e}.html`);return(0,r.readFileSync)(t,"utf8")}}catch(t){throw(0,n.logError)("Failed to load email template",t,{templateName:e}),Error(`Email template not found: ${e}`)}}(e);try{let e=(0,i.join)(process.cwd(),"emails","shared","components","header.html"),a=(0,i.join)(process.cwd(),"emails","shared","components","footer.html"),n=(0,i.join)(process.cwd(),"emails","shared","components","button.html"),o=(0,r.readFileSync)(e,"utf8"),s=(0,r.readFileSync)(a,"utf8"),d=(0,r.readFileSync)(n,"utf8");t=(t=(t=t.replace(/\{\{>\s*header\s*\}\}/g,o)).replace(/\{\{>\s*footer\s*\}\}/g,s)).replace(/\{\{>\s*button\s+([^}]+)\}\}/g,(e,t)=>{let a={};return t.split(/\s+/).forEach(e=>{let[t,r]=e.split("=");t&&r&&(a[t]=r.replace(/['"]/g,""))}),l(d,a)})}catch(e){(0,n.logWarn)("Failed to load shared components, using template as-is",{error:e})}return t}(e);return l(a,t)}},67894:(e,t,a)=>{var r=Object.create?function(e,t,a,r){void 0===r&&(r=a);var i=Object.getOwnPropertyDescriptor(t,a);(!i||("get"in i?!t.__esModule:i.writable||i.configurable))&&(i={enumerable:!0,get:function(){return t[a]}}),Object.defineProperty(e,r,i)}:function(e,t,a,r){void 0===r&&(r=a),e[r]=t[a]},i=Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t},n=function(){var e=function(t){return(e=Object.getOwnPropertyNames||function(e){var t=[];for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[t.length]=a);return t})(t)};return function(t){if(t&&t.__esModule)return t;var a={};if(null!=t)for(var n=e(t),l=0;l<n.length;l++)"default"!==n[l]&&r(a,t,n[l]);return i(a,t),a}}();Object.defineProperty(t,"__esModule",{value:!0}),t.sendEmail=m,t.sendVerificationEmail=p,t.sendPasswordResetEmail=_,t.sendWelcomeEmail=f,t.sendNotificationEmail=E,t.sendMagicLinkEmail=y;let l=a(65851),o=a(43863),s=process.env.RESEND_API_KEY,d=process.env.RESEND_FROM_EMAIL||"noreply@settler.dev",u=process.env.RESEND_FROM_NAME||"Settler",c=null;async function m(e){if(!c)return(0,o.logWarn)("Resend client not initialized - email not sent",{to:e.to,subject:e.subject}),null;try{let t=await c.emails.send({from:e.from||`${u} <${d}>`,to:Array.isArray(e.to)?e.to:[e.to],subject:e.subject,html:e.html,text:e.text,...e.replyTo&&{reply_to:e.replyTo},tags:e.tags});return(0,o.logInfo)("Email sent successfully",{emailId:t.data?.id||"unknown",to:e.to,subject:e.subject}),{id:t.data?.id||"unknown"}}catch(t){throw(0,o.logError)("Failed to send email",t,{to:e.to,subject:e.subject}),t}}async function p(e,t,a){let r=a||e.split("@")[0];return m({to:e,subject:"Verify your Settler account",html:`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2563eb;">Welcome to Settler, ${r}!</h1>
          <p>Thanks for signing up. Please verify your email address by clicking the button below:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${t}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Verify Email</a>
          </div>
          <p style="color: #666; font-size: 14px;">If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="color: #666; font-size: 14px; word-break: break-all;">${t}</p>
          <p style="color: #666; font-size: 14px; margin-top: 30px;">This link will expire in 24 hours.</p>
        </body>
      </html>
    `,text:`
      Welcome to Settler, ${r}!
      
      Thanks for signing up. Please verify your email address by visiting this link:
      ${t}
      
      This link will expire in 24 hours.
    `,tags:[{name:"email_type",value:"verification"}]})}async function _(e,t,a){let r=a||e.split("@")[0];return m({to:e,subject:"Reset your Settler password",html:`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2563eb;">Password Reset Request</h1>
          <p>Hi ${r},</p>
          <p>We received a request to reset your password. Click the button below to create a new password:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${t}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Reset Password</a>
          </div>
          <p style="color: #666; font-size: 14px;">If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="color: #666; font-size: 14px; word-break: break-all;">${t}</p>
          <p style="color: #666; font-size: 14px; margin-top: 30px;">This link will expire in 1 hour.</p>
          <p style="color: #999; font-size: 12px; margin-top: 30px;">If you didn't request this, you can safely ignore this email.</p>
        </body>
      </html>
    `,text:`
      Password Reset Request
      
      Hi ${r},
      
      We received a request to reset your password. Visit this link to create a new password:
      ${t}
      
      This link will expire in 1 hour.
      
      If you didn't request this, you can safely ignore this email.
    `,tags:[{name:"email_type",value:"password_reset"}]})}async function f(e,t,r,i,l){if(i&&l){let{sendTrialWelcomeEmail:r}=await Promise.resolve().then(()=>n(a(70058)));return r({email:e,firstName:t||e.split("@")[0]||"User",planType:"trial"},{trialStartDate:new Date().toISOString(),trialEndDate:l,daysRemaining:Math.ceil((new Date(l).getTime()-Date.now())/864e5)})}let o=t||e.split("@")[0],s=r||"https://app.settler.dev/dashboard";return m({to:e,subject:"Welcome to Settler! \uD83C\uDF89",html:`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2563eb;">Welcome to Settler, ${o}! 🎉</h1>
          <p>Your account is now verified and ready to use.</p>
          <p>Get started by:</p>
          <ul>
            <li>Creating your first reconciliation job</li>
            <li>Connecting your payment adapters (Stripe, PayPal, etc.)</li>
            <li>Exploring the dashboard</li>
          </ul>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${s}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Go to Dashboard</a>
          </div>
          <p style="color: #666; font-size: 14px;">Need help? Check out our <a href="https://docs.settler.dev">documentation</a> or reach out to <a href="mailto:support@settler.dev">support@settler.dev</a>.</p>
        </body>
      </html>
    `,text:`
      Welcome to Settler, ${o}! 🎉
      
      Your account is now verified and ready to use.
      
      Get started by creating your first reconciliation job and connecting your payment adapters.
      
      Go to your dashboard: ${s}
      
      Need help? Check out our documentation or reach out to support@settler.dev.
    `,tags:[{name:"email_type",value:"welcome"}]})}async function E(e,t,a,r,i,n){let l=n||e.split("@")[0];return m({to:e,subject:t,html:`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2563eb;">${t}</h1>
          <p>Hi ${l},</p>
          <p>${a}</p>
          ${r&&i?`
            <div style="text-align: center; margin: 30px 0;">
              <a href="${r}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">${i}</a>
            </div>
          `:""}
        </body>
      </html>
    `,text:`
      ${t}
      
      Hi ${l},
      
      ${a}
      
      ${r?`Visit: ${r}`:""}
    `,tags:[{name:"email_type",value:"notification"}]})}async function y(e,t,a){let r=a||e.split("@")[0];return m({to:e,subject:"Sign in to Settler",html:`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2563eb;">Sign in to Settler</h1>
          <p>Hi ${r},</p>
          <p>Click the button below to sign in to your account:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${t}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Sign In</a>
          </div>
          <p style="color: #666; font-size: 14px;">If the button doesn't work, copy and paste this link into your browser:</p>
          <p style="color: #666; font-size: 14px; word-break: break-all;">${t}</p>
          <p style="color: #666; font-size: 14px; margin-top: 30px;">This link will expire in 15 minutes.</p>
          <p style="color: #999; font-size: 12px; margin-top: 30px;">If you didn't request this, you can safely ignore this email.</p>
        </body>
      </html>
    `,text:`
      Sign in to Settler
      
      Hi ${r},
      
      Click this link to sign in to your account:
      ${t}
      
      This link will expire in 15 minutes.
      
      If you didn't request this, you can safely ignore this email.
    `,tags:[{name:"email_type",value:"magic_link"}]})}s?c=new l.Resend(s):(0,o.logWarn)("RESEND_API_KEY not set - email sending will be disabled")},43863:(e,t,a)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.logger=void 0,t.logInfo=function(e,a){d()&&t.logger.info(e,(0,i.redact)(a))},t.logError=function(e,a,r){let n=a instanceof Error?a:{message:String(a)};t.logger.error(e,{...(0,i.redact)(r),error:n.message,stack:a instanceof Error&&"stack"in n&&n.stack?String(n.stack):void 0})},t.logWarn=function(e,a){d()&&t.logger.warn(e,(0,i.redact)(a))},t.logDebug=function(e,a){d()&&t.logger.debug(e,(0,i.redact)(a))},t.logBusinessEvent=function(e,a){t.logger.info(`business_event:${e}`,{event_type:e,...(0,i.redact)(a)})},t.logPerformance=function(e,a,r){t.logger.info(`performance:${e}`,{operation:e,duration_ms:a,...(0,i.redact)(r)})};let r=function(e){return e&&e.__esModule?e:{default:e}}(a(93621)),i=a(91338),n=a(27561),l=a(11045),o=r.default.format(e=>{let t=function(){let e=n.trace.getActiveSpan();if(!e)return{};let t=e.spanContext();return{trace_id:t.traceId,span_id:t.spanId}}();return{...e,...t}})(),s=r.default.format.combine(o,r.default.format.timestamp(),r.default.format.errors({stack:!0}),r.default.format.json());function d(){return l.config.logging.samplingRate>=1||Math.random()<l.config.logging.samplingRate}t.logger=r.default.createLogger({level:l.config.logging.level,format:s,defaultMeta:{service:"settler-api",environment:l.config.nodeEnv},transports:[new r.default.transports.Console({format:r.default.format.combine(r.default.format.colorize(),r.default.format.printf(e=>{let{timestamp:t,level:a,message:r,trace_id:n,span_id:l,tenant_id:o,...s}=e,d=Object.keys(s).length?JSON.stringify((0,i.redact)(s)):"",u=n&&"string"==typeof n?`[trace_id=${n.substring(0,16)}]`:"",c=l&&"string"==typeof l?`[span_id=${l.substring(0,16)}]`:"",m=o?`[tenant_id=${o}]`:"";return`${t} [${a}]${u}${c}${m}: ${r} ${d}`}))})]})},91338:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.redact=function e(t,r=[]){if(null==t||"object"!=typeof t)return t;if(Array.isArray(t))return t.map(t=>e(t,r));let i=[...a,...r],n={};for(let[a,l]of Object.entries(t)){let t=a.toLowerCase();i.some(e=>t.includes(e.toLowerCase()))?n[a]="[REDACTED]":"object"==typeof l&&null!==l?n[a]=e(l,r):n[a]=l}return n};let a=["apiKey","api_key","apiKeyHash","secret","password","token","card_number","cvv","ssn","email","phone","credit_card","passwordHash","keyHash","secret","webhookSecret"]}};