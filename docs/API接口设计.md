# OneStory 后台API接口设计文档

## 概述

本文档基于前端UI交互分析，提取并设计OneStory平台的后台API接口。所有接口均基于RESTful规范设计。

## 通用规范

### 基础信息

- **基础URL**: `https://onestory.art/api`
- **协议**: HTTPS
- **数据格式**: JSON

### 通用请求头

所有需要认证的接口都需要包含以下请求头：

```
Authorization: Bearer {JWT_TOKEN}
Content-Type: application/json
Accept: application/json, text/plain, */*
```

### 通用响应格式

```json
{
  "code": 0,
  "message": "success",
  "data": {}
}
```

### 错误码规范

- `0`: 成功
- `401`: 未授权
- `403`: 权限不足
- `404`: 资源不存在
- `500`: 服务器错误

---

## 1. 用户管理模块

### 1.1 获取用户信息

**接口**: `GET /user/info`

**说明**: 获取当前登录用户的详细信息

**请求参数**: 无

**响应示例**:
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "userId": "123696",
    "username": "用户名",
    "avatar": "https://...",
    "email": "user@example.com",
    "planType": "premium",
    "credits": 100
  }
}
```

---

### 1.2 获取未读消息数

**接口**: `GET /user/message/unread`

**说明**: 获取用户未读消息数量

**请求参数**: 无

**响应示例**:
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "unreadCount": 5
  }
}
```

---

### 1.3 获取弹窗消息

**接口**: `GET /user/message/popup`

**说明**: 获取需要弹窗显示的消息

**请求参数**: 无

**响应示例**:
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "messages": [
      {
        "id": "msg_001",
        "title": "系统通知",
        "content": "您有新的功能可以体验",
        "type": "info",
        "createdAt": "2025-10-24T10:00:00Z"
      }
    ]
  }
}
```

---

## 2. 项目模板模块

### 2.1 获取模板列表

**接口**: `GET /project/template/list`

**说明**: 获取项目模板列表

**请求参数**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| categoryId | integer | 否 | 模板分类ID |

**请求示例**: `GET /project/template/list?categoryId=1`

**响应示例**:
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "templates": [
      {
        "id": "tpl_001",
        "name": "商业宣传模板",
        "categoryId": 1,
        "thumbnail": "https://...",
        "description": "适合产品宣传的模板"
      }
    ]
  }
}
```

---

## 3. 故事板项目模块

### 3.1 创建项目

**接口**: `POST /storyboard/create/project/v1`

**说明**: 创建新的故事板项目

**请求体**:
```json
{
  "name": "新建项目2025-10-24_13:21"
}
```

**响应示例**:
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "projectId": "f6d162c030ddc58947585ce3925a8813",
    "name": "新建项目2025-10-24_13:21",
    "createdAt": "2025-10-24T13:21:00Z"
  }
}
```

---

### 3.2 获取项目列表

**接口**: `GET /storyboard/project/list`

**说明**: 获取用户的项目列表（分页）

**请求参数**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| pageSize | integer | 是 | 每页数量 |
| pageNum | integer | 是 | 页码（从1开始） |

**请求示例**: `GET /storyboard/project/list?pageSize=20&pageNum=1`

**响应示例**:
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "total": 100,
    "pageSize": 20,
    "pageNum": 1,
    "projects": [
      {
        "id": "f6d162c030ddc58947585ce3925a8813",
        "name": "新建项目2025-10-24_13:21",
        "thumbnail": "https://...",
        "updatedAt": "2025-10-24T13:21:00Z"
      }
    ]
  }
}
```

---

### 3.3 获取项目详情

**接口**: `GET /storyboard/project`

**说明**: 获取指定项目的详细信息

**请求参数**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | string | 是 | 项目ID |

**请求示例**: `GET /storyboard/project?id=f6d162c030ddc58947585ce3925a8813`

**响应示例**:
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "id": "f6d162c030ddc58947585ce3925a8813",
    "name": "新建项目2025-10-24_13:21",
    "content": "项目脚本内容...",
    "style": "动漫风格",
    "createdAt": "2025-10-24T13:21:00Z",
    "updatedAt": "2025-10-24T13:25:00Z"
  }
}
```

---

### 3.4 更新项目

**接口**: `POST /storyboard/project/update`

**说明**: 更新项目内容

**请求体**:
```json
{
  "id": "f6d162c030ddc58947585ce3925a8813",
  "content": "更新后的脚本内容..."
}
```

**响应示例**:
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "updated": true,
    "updatedAt": "2025-10-24T13:30:00Z"
  }
}
```

---

### 3.5 获取项目权益

**接口**: `GET /storyboard/project/benefit`

**说明**: 获取项目相关的权益信息

**请求参数**: 无

**响应示例**:
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "benefits": [
      {
        "name": "AI智能生成",
        "enabled": true,
        "quota": 100,
        "used": 10
      }
    ]
  }
}
```

---

### 3.6 获取项目风格

**接口**: `GET /storyboard/project/style`

**说明**: 获取可用的项目风格列表

**请求参数**: 无

**响应示例**:
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "styles": [
      {
        "id": "anime",
        "name": "动漫风格",
        "thumbnail": "https://..."
      },
      {
        "id": "realistic",
        "name": "写实风格",
        "thumbnail": "https://..."
      }
    ]
  }
}
```

---

## 4. 故事板生成模块

### 4.1 脚本转角色

**接口**: `POST /storyboard/script_to_figure`

**说明**: 从脚本内容中提取并生成角色

**请求体**:
```json
{
  "projectId": "f6d162c030ddc58947585ce3925a8813"
}
```

**响应示例**:
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "taskId": "task_001",
    "status": "processing"
  }
}
```

---

### 4.2 脚本转分镜

**接口**: `POST /storyboard/script_to_shot`

**说明**: 将脚本转换为分镜头

**请求体**:
```json
{
  "id": "scene_001",
  "name": "开场场景",
  "type": -1,
  "pictureSize": "3:2",
  "content": "场景描述...",
  "generateShot": true
}
```

**响应示例**:
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "taskId": "task_002",
    "shotCount": 5,
    "status": "processing"
  }
}
```

---

### 4.3 批量文字生成图片

**接口**: `POST /storyboard/batch_txt2img`

**说明**: 批量将文字描述转换为图片

**请求体**:
```json
{
  "projectId": "f6d162c030ddc58947585ce3925a8813"
}
```

**响应示例**:
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "taskId": "task_003",
    "totalCount": 10,
    "status": "queued"
  }
}
```

---

### 4.4 获取分镜信息

**接口**: `POST /storyboard/fetch_shot`

**说明**: 获取项目的分镜详细信息

**请求体**:
```json
{
  "projectId": "f6d162c030ddc58947585ce3925a8813"
}
```

**响应示例**:
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "shots": [
      {
        "id": "shot_001",
        "description": "开场镜头",
        "imageUrl": "https://...",
        "duration": 5
      }
    ]
  }
}
```

---

### 4.5 获取故事板列表

**接口**: `GET /storyboard/list`

**说明**: 获取项目的故事板列表

**请求参数**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| projectId | string | 是 | 项目ID |

**响应示例**:
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "storyboards": [
      {
        "id": "1981592200073023490",
        "name": "第一幕",
        "imageUrl": "https://...",
        "createdAt": "2025-10-24T13:25:00Z"
      }
    ]
  }
}
```

---

### 4.6 获取头部列表

**接口**: `GET /storyboard/header_list`

**说明**: 获取故事板的章节头部列表

**请求参数**: 无

**响应示例**:
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "headers": [
      {
        "id": "header_001",
        "title": "第一章",
        "order": 1
      }
    ]
  }
}
```

---

### 4.7 查询生成状态

**接口**: `POST /storyboard/status`

**说明**: 查询异步任务的生成状态

**请求体**:
```json
{
  "projectId": "f6d162c030ddc58947585ce3925a8813",
  "storyboardId": "1981592200073023490",
  "taskId": "1981592675744845826",
  "type": 3
}
```

**响应示例**:
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "status": "completed",
    "progress": 100,
    "result": {
      "imageUrl": "https://..."
    }
  }
}
```

---

### 4.8 获取生成历史

**接口**: `GET /storyboard/generate/history`

**说明**: 获取生成任务的历史记录

**请求参数**: 无

**响应示例**:
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "history": [
      {
        "taskId": "task_001",
        "type": "text_to_image",
        "status": "completed",
        "createdAt": "2025-10-24T13:20:00Z"
      }
    ]
  }
}
```

---

## 5. 角色管理模块

### 5.1 获取项目角色

**接口**: `GET /storyboard/fetch_role/{projectId}`

**说明**: 获取指定项目的角色列表

**路径参数**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| projectId | string | 是 | 项目ID |

**响应示例**:
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "roles": [
      {
        "id": "role_001",
        "name": "主角",
        "description": "男性，30岁左右...",
        "imageUrl": "https://..."
      }
    ]
  }
}
```

---

### 5.2 角色列表

**接口**: `POST /storyboard/role/list`

**说明**: 获取角色列表（支持筛选）

**请求体**:
```json
{
  "projectId": "f6d162c030ddc58947585ce3925a8813",
  "showAll": true,
  "origin": 1
}
```

**响应示例**:
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "roles": [
      {
        "id": "1981564057190764546",
        "name": "角色名称",
        "imageUrl": "https://...",
        "origin": 1
      }
    ]
  }
}
```

---

### 5.3 添加预设角色

**接口**: `POST /storyboard/role/add/v1`

**说明**: 从预设角色库中添加角色到项目

**请求体**:
```json
{
  "projectId": "f6d162c030ddc58947585ce3925a8813",
  "roleId": "1981564057190764546",
  "type": 1
}
```

**响应示例**:
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "roleId": "role_new_001",
    "added": true
  }
}
```

---

### 5.4 添加自定义角色

**接口**: `POST /storyboard/role/add`

**说明**: 创建并添加自定义角色

**请求体**:
```json
{
  "projectId": "f6d162c030ddc58947585ce3925a8813"
}
```

**响应示例**:
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "roleId": "role_custom_001",
    "created": true
  }
}
```

---

### 5.5 重新生成角色

**接口**: `POST /storyboard/role/regenerate`

**说明**: 重新生成角色形象

**请求体**:
```json
{
  "figureExampleUrl": [],
  "projectId": "f6d162c030ddc58947585ce3925a8813",
  "figureName": "新建人物2",
  "figureDesc": "请详细描述人物特征，包括外貌、衣着等",
  "roleId": "1981592069550477314",
  "imgUrl": ""
}
```

**响应示例**:
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "taskId": "task_004",
    "status": "processing"
  }
}
```

---

### 5.6 最近使用角色

**接口**: `POST /storyboard/recent/role/list`

**说明**: 获取最近使用的角色列表

**请求体**:
```json
{
  "pageSize": 20,
  "pageNum": 0,
  "projectId": "f6d162c030ddc58947585ce3925a8813",
  "figureName": ""
}
```

**响应示例**:
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "total": 50,
    "roles": [
      {
        "id": "role_001",
        "name": "主角",
        "imageUrl": "https://...",
        "lastUsedAt": "2025-10-24T13:20:00Z"
      }
    ]
  }
}
```

---

## 6. AI辅助模块

### 6.1 AI对话

**接口**: `POST /ai/chat`

**说明**: 与AI进行对话交互

**请求体**:
```json
{
  "prompt": "请帮我写一个开场白",
  "projectId": "f6d162c030ddc58947585ce3925a8813"
}
```

**响应示例**:
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "response": "在一个阳光明媚的早晨...",
    "conversationId": "conv_001"
  }
}
```

---

### 6.2 AI命令

**接口**: `POST /ai/command`

**说明**: 执行AI命令（结构化对话）

**请求体**:
```json
{
  "id": "editor",
  "messages": [
    {
      "role": "user",
      "content": "帮我优化这段文字",
      "parts": [
        {
          "type": "text",
          "text": "原始文本内容"
        }
      ]
    }
  ],
  "system": "你是一个专业的编剧助手"
}
```

**响应示例**:
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "response": "优化后的文本内容",
    "suggestions": []
  }
}
```

---

### 6.3 AI智能续写

**接口**: `POST /ai/copilot`

**说明**: AI智能续写功能

**请求体**:
```json
{
  "prompt": "继续文本直到下一个标点符号：主角走进房间"
}
```

**响应示例**:
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "completion": "，发现桌上放着一封信。"
  }
}
```

---

## 7. 视频生成模块

### 7.1 获取视频模型列表

**接口**: `GET /video_model/list`

**说明**: 获取可用的视频生成模型列表

**请求参数**: 无

**响应示例**:
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "models": [
      {
        "name": "seedance",
        "displayName": "SeeDance",
        "versions": ["lite", "pro"],
        "supportedResolutions": ["480p", "720p", "1080p"]
      }
    ]
  }
}
```

---

### 7.2 图片转视频

**接口**: `POST /storyboard/img_to_video`

**说明**: 将静态图片转换为视频

**请求体**:
```json
{
  "modelName": "seedance",
  "version": "lite",
  "image": "https://...",
  "duration": "5",
  "resolution": "480p",
  "storyboardId": "1981592200073023490",
  "projectId": "f6d162c030ddc58947585ce3925a8813"
}
```

**响应示例**:
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "taskId": "video_task_001",
    "status": "queued",
    "estimatedTime": 60
  }
}
```

---

### 7.3 获取镜头视频列表

**接口**: `POST /storyboard/shot_video_list`

**说明**: 获取已生成的镜头视频列表

**请求体**:
```json
{
  "projectId": "f6d162c030ddc58947585ce3925a8813",
  "storyboardId": "1981592200073023490",
  "pageSize": 10,
  "pageNum": 1,
  "status": []
}
```

**响应示例**:
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "total": 25,
    "videos": [
      {
        "id": "video_001",
        "shotId": "shot_001",
        "videoUrl": "https://...",
        "status": "completed",
        "duration": 5,
        "createdAt": "2025-10-24T13:30:00Z"
      }
    ]
  }
}
```

---

### 7.4 对话语音合成

**接口**: `GET /storyboard/dialogue_tts/{projectId}`

**说明**: 为对话生成语音（Text-to-Speech）

**路径参数**:
| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| projectId | string | 是 | 项目ID |

**响应示例**:
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "dialogues": [
      {
        "id": "dialogue_001",
        "text": "你好，欢迎来到这里",
        "audioUrl": "https://...",
        "speaker": "角色1"
      }
    ]
  }
}
```

---

## 8. 音频模块

### 8.1 获取音频标签

**接口**: `GET /audio/tag`

**说明**: 获取音频分类标签

**请求参数**: 无

**响应示例**:
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "tags": [
      {
        "id": "tag_001",
        "name": "背景音乐",
        "icon": "https://..."
      },
      {
        "id": "tag_002",
        "name": "音效",
        "icon": "https://..."
      }
    ]
  }
}
```

---

## 9. 订阅与权益模块

### 9.1 获取套餐权益设置

**接口**: `GET /plan/benefit/setting`

**说明**: 获取当前用户套餐的权益设置

**请求参数**: 无

**响应示例**:
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "planName": "专业版",
    "benefits": [
      {
        "feature": "AI生成次数",
        "quota": 1000,
        "used": 150,
        "unlimited": false
      },
      {
        "feature": "视频导出",
        "quota": 0,
        "used": 0,
        "unlimited": true
      }
    ],
    "expiresAt": "2026-10-24T00:00:00Z"
  }
}
```

---

## 附录

### A. 接口分类统计

| 模块 | 接口数量 | GET | POST |
|------|----------|-----|------|
| 用户管理 | 3 | 3 | 0 |
| 项目模板 | 1 | 1 | 0 |
| 故事板项目 | 6 | 3 | 3 |
| 故事板生成 | 8 | 2 | 6 |
| 角色管理 | 6 | 1 | 5 |
| AI辅助 | 3 | 0 | 3 |
| 视频生成 | 4 | 1 | 3 |
| 音频 | 1 | 1 | 0 |
| 订阅权益 | 1 | 1 | 0 |
| **总计** | **33** | **13** | **20** |

### B. 核心业务流程

#### 创建故事板的完整流程：

1. 创建项目：`POST /storyboard/create/project/v1`
2. 更新脚本：`POST /storyboard/project/update`
3. 生成角色：`POST /storyboard/script_to_figure`
4. 添加角色：`POST /storyboard/role/add` 或 `POST /storyboard/role/add/v1`
5. 生成分镜：`POST /storyboard/script_to_shot`
6. 批量生成图片：`POST /storyboard/batch_txt2img`
7. 查询状态：`POST /storyboard/status`
8. 生成视频：`POST /storyboard/img_to_video`
9. 生成语音：`GET /storyboard/dialogue_tts/{projectId}`
10. 导出成品

### C. 认证与授权

所有接口均需要JWT Token认证，Token通过登录接口获取（登录接口未在UI交互中体现）。

Token格式：
```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

Token包含信息：
- `aud`: 用户ID
- `exp`: 过期时间戳

### D. 异步任务处理

对于耗时操作（如AI生成、视频转换等），采用异步任务模式：

1. 接口返回 `taskId` 和初始状态 `queued` 或 `processing`
2. 客户端通过 `POST /storyboard/status` 轮询查询任务状态
3. 任务完成后状态变为 `completed`，并返回结果

状态值：
- `queued`: 排队中
- `processing`: 处理中
- `completed`: 已完成
- `failed`: 失败

---

**文档版本**: v1.0  
**更新日期**: 2025-10-24  
**基于数据**: data/ui.txt (前端网络请求分析)
