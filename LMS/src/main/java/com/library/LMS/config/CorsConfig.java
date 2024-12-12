package com.library.LMS.config;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // شامل تمام مسیرهای زیر "/api"
                .allowedOrigins("http://localhost:5173", "http://localhost:63342") // آدرس فرانت‌اند
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // متدهای مجاز
                .allowedHeaders("*")
                .allowCredentials(true);

    }
}
