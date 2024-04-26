<%--
  Created by IntelliJ IDEA.
  User: patrick
  Date: 24. 4. 19.
  Time: 오후 4:40
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<div align="center">

    <form method="post" action="admin_login_ok.go">

        <input type="text" id="adminId" name="adminId" maxlength="50" placeholder="관리자 계정" > <br>

        <input type="password" id="adminPwd" name="adminPwd" placeholder="관리자 비밀번호"><br><br><br>

        <input type="submit" onclick="return checkId()" value="로그인">

    </form>
</div>


</body>
</html>
