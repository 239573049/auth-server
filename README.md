# 👻 openiddict 统一授权认证系统

## 🦄 介绍
统一授权中心
由于[`abp`](https://abp.io/)默认提供的ui功能太少所以开发一个更多管理功能的系统

前端框架采用[`umi`](https://v3.umijs.org/zh-CN/)+[`react`](https://reactjs.org/)+[`antd`](https://ant.design/index-cn/)实现界面管理
后端框架基于[`abp`](https://abp.io/)的[`openiddict`](https://github.com/openiddict/openiddict-corea)实现

## 🕸️界面
![输入图片说明](imgs/image.png)

![输入图片说明](imgs/clientimage.png)

## 🤖软件架构
    - `.Net6`：WebApi
    - `react`+`umi`+`antd` 前端框架
    -  `abp`后端框架
    - `openiddict` 授权框架

## 运行环境
    - Visual Studio 2022
    - .Net6 SDK +
    - React 17
    - node 16
   
## 支持平台
   - 运行环境
       - windows
       - Linux
       - Mac
   - 数据库
        - 理论上efcore支持的都可以切换 具体切换参考[abp迁移文档](https://docs.abp.io/zh-Hans/abp/latest/Entity-Framework-Core-Other-DBMS)
    
   - 部署
        - Nginx
        - Docker
        - 直接运行

## 项目初始配置
    1. 请先修改`Simple.DbMigrator`项目的配置文件的数据库连接字符串然后执行`Simple.DbMigrator`项目进行数据迁移
    2. 修改`Simple.AuthServer`项目的配置文件的数据库连接字符串 
    3. `Simple.AuthServer`项目运行环境需要`redis`+`SqlServer`才能运行