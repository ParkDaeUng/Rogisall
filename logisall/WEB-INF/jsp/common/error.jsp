<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page session="false" %>
<html>
<head>
<title>LogiWorks</title>
</head>
<body>

<c:choose>
    <c:when test="${errCode == 400}">
        <h1>ERROR PAGE 400 Bad Request</h1>
    </c:when>
    <c:when test="${errCode == 401}">
        <h1>ERROR PAGE 401 Unauthorized</h1>
    </c:when>
    <c:when test="${errCode == 500}">
        <h1>ERROR PAGE 500 Internal Server Error</h1>
    </c:when>
</c:choose>

</body>
</html>
