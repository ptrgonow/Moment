package com.moment.controller;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@WebFilter("*.go")
public class TimingFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        long startTime = System.nanoTime();
        chain.doFilter(request, response);
        long endTime = System.nanoTime();
        long durationNano = endTime - startTime;
        long durationMilli = durationNano / 1_000_000;
        double durationSec = durationNano / 1_000_000_000.0;

        String requestUri = ((HttpServletRequest) request).getRequestURI();

        System.out.println("Request URI: " + requestUri);
        System.out.println("Request 처리 시간: " + durationNano + " 나노초");
        System.out.println("Request 처리 시간: " + durationMilli + " 밀리초");
        System.out.printf("Request 처리 시간: %.3f 초\n", durationSec);
        System.out.println("===========================================");
    }
}
