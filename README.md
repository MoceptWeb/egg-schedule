
# 代码步骤

## config
自定将config.local1.js替换为config.local.js 并加上对应配置

- 使用schedule
在项目启动时候运行脚本

- 导出mail信息

```sql
mysql -h172.16.1.13 -uroot -ppwd -e "SELECT CONCAT('insert into info(user_id,mail) values(',user_id,',\'',mail, '\');') FROM t_user WHERE mail IS NOT NULL and mail != ''"  db_database> somenwhere/work/SQL/t_user/t_user.sql
```
去除该文件第一行， 交给对应用户中心人员

- 获取portal的txt文件后
  - 注释updateOa2User任务， 开启updatePortal2User任务
  - 解析改txt文本进行更新user_center_id


# 检测任务完成和是否有错误

- updateOa2User 任务
   -  info日志中schedule updateOa2User finish
   -  主要查看error日志中 “数据库error”， “登录名loginid匹配运营account有超过两条数据” 关键字，

- updatePortal2User 任务
   -  info日志中schedule updatePortal2User finish
   -  主要查看error日志中 “数据库error” 关键字
