const fs =require("fs");
const path=require("path");
const Koa=require("koa");
const serve=require("koa-better-serve");
const app =new Koa();

const { createBundleRenderer } = require("vue-server-renderer");
const bundle = require("./dist/vue-ssr-server-bundle.json");
const clientManifest = require("./dist/vue-ssr-client-manifest.json");

const renderer = createBundleRenderer(bundle, {
  runInNewContext: false,
  template: fs.readFileSync(path.resolve(__dirname,"./public/index.html"), "utf-8"),
  clientManifest: clientManifest
});

function renderToString(context) {
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, (err, html) => {
      err ? reject(err) : resolve(html);
    });
  });
}
;
app.use(async (ctx, next) => {
  const context = {
    title: "ssr test",
    url: ctx.url
  };
  // 将 context 数据渲染为 HTML
  try{
  const html = await renderToString(context);
  ctx.body = html;
  }catch(e){
      await next();
  }
});

app.use(serve("./dist"));

app.listen(3000,function(){
    console.log("app listen 3000")
})