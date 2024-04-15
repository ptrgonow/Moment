package com.moment.configuration;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class ConnectionPool {

    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rs = null;

    private static ConnectionPool instance = null;

    private ConnectionPool() {

    }

    public static ConnectionPool getInstance() {

        if (instance == null) {
            instance = new ConnectionPool();
        }
        return instance;
    }

    // TODO :  DataSource ds = (DataSource) ctx.lookup("jdbc/이부분"); = 이 부분에 반드시 context.xml 에 설정한 name 을 넣어야 함
    public void connect( ) {

        try {
            Context initCtx = new InitialContext();
            Context ctx = (Context) initCtx.lookup("java:comp/env");
            DataSource ds = (DataSource) ctx.lookup("jdbc/mymaria");
            conn = ds.getConnection();

        } catch (Exception e) {
            System.out.println("DB 연결 실패" + e);
        }
    }

    public void disconnect(ResultSet rs, PreparedStatement pstmt, Connection conn) {

        try {
            if (rs != null) rs.close();
            if (pstmt != null) pstmt.close();
            if (conn != null) conn.close();
            System.out.println("연결 해제 성공");

        } catch (Exception e) {
            System.out.println("연결 해제 실패" + e);
        }
    }

    public void disconnect(PreparedStatement pstmt, Connection conn) {

        try {
            if (pstmt != null) pstmt.close();
            if (conn != null) conn.close();

        } catch (Exception e) {
            System.out.println("연결 해제 실패" + e);
        }
    }
}