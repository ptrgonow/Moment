<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: patrick
  Date: 24. 4. 9.
  Time: 오후 3:54
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Moment</title>
    <link rel="stylesheet" type="text/css" href="<c:url value="/CSS/User/UserLogIn.css"/>">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">
</head>

<body>

<div class="logo-box">
    <img src="<c:url value="/image/logoprint.svg"/>" alt="logo" />
</div>

<div class="Container">
    <!-- last card -->
    <div class="Picture">
        <img class="Picture-img" src="<c:url value="/image/logoprint.svg"/>" alt=""/>
        <div class="Picture-note"><span>Moment-<a class="Network" href="https://www.naver.com" target="_top"><img src="https://cdn-icons-png.flaticon.com/512/2111/2111501.png" alt="네이버" /></a><a class="Network" href="https://google.com" target="_top"><img src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-logo-vector-png-clipart-1.png" alt="twitter" /></a></span></div>
    </div>

    <!-- other cards -->
    <%----%>
    <div class="Picture">
        <img class="Picture-img" src="<c:url value="/image/passport.png"/>" alt="" />
        <div class="Picture-note"><span>passport</span></div>
    </div>
    <div class="Picture">
        <img class="Picture-img" src="https://picsum.photos/id/613/400" alt="" />
        <div class="Picture-note"><span>Golden Gate Bridge - San Francisco</span></div>
    </div>
    <div class="Picture">
        <img class="Picture-img" src="https://picsum.photos/id/40/400" alt="" />
        <div class="Picture-note"><span>Cat nose</span></div>
    </div>
    <div class="Picture">
        <img class="Picture-img" src="https://picsum.photos/id/465/400" alt="" />
        <div class="Picture-note"><span>Mountain</span></div>
    </div>
    <div class="Picture">
        <img class="Picture-img" src="https://picsum.photos/id/1029/400" alt="" />
        <div class="Picture-note"><span>Central Park - New York</span></div>
    </div>
    <div class="Picture">
        <img class="Picture-img" src="https://picsum.photos/id/923/400" alt="" />
        <div class="Picture-note"><span>Autumn</span></div>
    </div>
    <div class="Picture">
        <img class="Picture-img" src="https://picsum.photos/id/425/400" alt="" />
        <div class="Picture-note"><span>Coffee</span></div>
    </div>
    <div class="Picture">
        <img class="Picture-img" src="https://picsum.photos/id/200/400" alt="" />
        <div class="Picture-note"><span>An Irish cow enjoying the wind on the beach</span></div>
    </div>
    <div class="Picture">
        <img class="Picture-img" src="https://picsum.photos/id/244/400" alt="" />
        <div class="Picture-note"><span>pelicans at the water's edge</span></div>
    </div>


    <!-- first card (login) -->


    <div id="login" class="Picture login" >

        <div class="login-container">
            <img class="Picture-img" src="https://images.pexels.com/photos/416024/pexels-photo-416024.jpeg" alt="" />
            <form action="user_login.go" method="post">
                <table class="login-tbl">
                    <tr>
                        <th>id</th>
                        <td><input type="text" class="user_id" name="user_id" /></td>
                    </tr>
                    <tr>
                        <th>password</th>
                        <td><input type="password" class="user_pwd" name="user_pwd" /></td>
                    </tr>
                    <tr>
                        <td colspan="2" class="sub-td">
                            <input type="submit" value="login" />
                        </td>
                    </tr>
                </table>
            </form>
            <input type="button" value="관리자" onclick="location.href='admin_login.go'">
            <input type="button" value="테스트" onclick="location.href='admin.go'">
        </div>
        <div class="signup-container">
            <img class="Picture-img" src="<c:url value="/image/logoprint.svg"/>" alt=""/>
            <form action="user_signup,go" method="post">
                <table class="sign-tbl">
                    <tr>
                        <th>id</th>
                        <td><input type="text" class="sign-id" name="sign_id" placeholder="example@Email.com" /></td>
                    </tr>
                    <tr>
                        <th>password</th>
                        <td><input type="password" class="sign-pwd" name="sign_pwd" placeholder="비밀번호"/></td>
                    </tr>
                    <tr>
                        <th>name</th>
                        <td><input type="text" class="sign-name" name="sign_name" placeholder="이름" /></td>
                    </tr>
                    <tr>
                        <td colspan="2" class="sub-td">
                            <input type="submit" value="signup" />
                        </td>
                    </tr>
                </table>
            </form>
        </div>
        <div class="Picture-note l-btn"><span>Login</span><i class="bi bi-pencil"></i></div>
        <div class="Picture-note s-btn"><span>signup</span><i class="bi bi-pencil"></i></div>
    </div>
</div>


<!-- Jquery -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script src="<c:url value="/JS/User/UserLogIn.js"/>"></script>
</body>
</html>

