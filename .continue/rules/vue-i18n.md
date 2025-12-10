---
description: 当实现多语言支持时应用此规则
alwaysApply: false
---

使用 Vue I18n 时应遵循以下规范：
1. 所有用户界面文本必须使用 $t() 函数进行国际化
2. 翻译键名使用点号分隔的层级结构（如 'app.newChat'）
3. 语言文件使用 JSON 格式，按功能模块组织
4. 在组件中导入 useI18n 并使用 Composition API
5. 语言切换时同步更新配置存储和 i18n 实例
6. 提供完整的类型定义支持