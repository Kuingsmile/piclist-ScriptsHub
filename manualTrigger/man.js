/**
 * @name man
 * @author Kuingsmile
 * @description test
 * @version 1.0.0
 */

// ctx 为 核心PicList实例, extra为额外参数, 其中extra.galleryItem为当前删除的相册对象
// 可用额外API: axios, crypto, fs, path, os, setTimeout, setInterval, clearTimeout, clearInterval, base64Decode, base64Encode
// 使用console.log或ctx.log输出的信息在软件日志文件piclist.log中可以查询到

async function main(ctx, extra) {
  console.log('env.TEST_ENV : ',env.TEST_ENV)
  return ctx
}