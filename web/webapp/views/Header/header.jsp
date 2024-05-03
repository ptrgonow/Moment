<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: patrick
  Date: 24. 4. 26.
  Time: 오후 2:54
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<head>
    <title>Title</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>PSN</title>
    <link rel="stylesheet" href="/CSS/Diary/PsnMain.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

</head>
<body>

<div class="head-container" align="center">

    <%-- 상단 가로 네비 바 --%>
    <div class="nav-bar">
        <div class="nav-bar-left">
            <a href="<c:url value="/user_main.go"/>" class="nav-bar-left-title"><img src="<c:url value="/image/logoprint.svg"/>" alt="logo" /></a>
        </div>
        <div class="nav-bar-right">
            <a href="<c:url value="/user_main.go"/>" class="nav-bar-right-item">Home</a>
            <a href="<c:url value="/user_psn.go"/>" class="nav-bar-right-item">Diary</a>
            <a href="/views/Diary/Share/ShareMain.jsp" class="nav-bar-right-item">Gallery</a>
            <a href="#" class="nav-bar-right-item">Shop</a>
        </div>
        <div class="user-info">
            <a href="#" class="user-info-item">${sessionScope.userName}</a>
        </div>

</div>
