package com.moment.configuration;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

public class ConnectionPool {

    private static ConnectionPool instance = null;

    private ConnectionPool() {

    }

    public static ConnectionPool getInstance() {

        if (instance == null) {
            instance = new ConnectionPool();
        }
        return instance;
    }

    // TODO : DataSource ds = (DataSource) ctx.lookup("jdbc/이부분"); = 이 부분에 반드시 context.xml 에 설정한 name 을 넣어야 함
    public Connection connect() throws SQLException {

        Connection conn = null;
        try {
            Context initCtx = new InitialContext();
            Context ctx = (Context) initCtx.lookup("java:comp/env");
            DataSource ds = (DataSource) ctx.lookup("jdbc/maria");
            conn = ds.getConnection();
            System.out.println("DB 연결 성공");
        } catch (Exception e) {
            System.out.println("DB 연결 실패" + e);

            // 예외를 SQLException 로 다시 던져서 호출하는 쪽에서 처리하도록 합니다.
            throw new SQLException("DB 연결 실패", e);
        }
        return conn;
    }
}
