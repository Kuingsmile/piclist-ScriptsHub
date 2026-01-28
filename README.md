# PicList 脚本仓库

这是一个用于管理和分享各种脚本的仓库。推荐在软件内进行提交，如需在此处提交，请遵循以下规范：

## 提交规范

1. **脚本格式**：请确保提交的脚本符合 PicList 支持的格式要求。
2. **命名规范**：脚本文件应使用有意义的名称，便于识别和管理。
3. **描述信息**：每个脚本应附带简要的描述信息，说明其功能和用途。
4. **版本控制**：请注明脚本的版本号，便于后续维护和更新。
5. **测试验证**：提交前请确保脚本经过充分测试，能够正常运行。

## 脚本文件格式

脚本文件应采用以下格式：

```javascript
/**
 * @name testScript
 * @author Kuingsmile
 * @description 这是一个测试脚本
 * @version 1.0.0
 */

async function main(ctx, extra) {
  console.log('Hello, PicList!')
  return ctx
}
```

注意开头的注释部分，必须包含 `@name`、`@author`、`@description` 和 `@version` 四个字段用以区分脚本信息。