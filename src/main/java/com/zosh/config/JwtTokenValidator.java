package com.zosh.config;

import java.io.IOException;
import java.util.List;

import javax.crypto.SecretKey;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtTokenValidator extends OncePerRequestFilter {

	@Override
	protected void doFilterInternal(HttpServletRequest request,
									HttpServletResponse response,
									FilterChain filterChain)
			throws ServletException, IOException {

		String path = request.getServletPath();

		// Skip JWT validation for auth APIs
		if (path.startsWith("/auth")) {
			filterChain.doFilter(request, response);
			return;
		}
		String bearerToken = request.getHeader(JwtConstant.JWT_HEADER);

		if (bearerToken != null
				&& bearerToken.startsWith("Bearer ")
				&& bearerToken.length() > 7) {

			String jwt = bearerToken.substring(7);

			try {

				SecretKey key = Keys.hmacShaKeyFor(
						JwtConstant.SECRET_KEY.getBytes()
				);

				Claims claims = Jwts.parserBuilder()
						.setSigningKey(key)
						.build()
						.parseClaimsJws(jwt)
						.getBody();

				String email = String.valueOf(claims.get("email"));

				String authorities = String.valueOf(
						claims.get("authorities")
				);

				List<GrantedAuthority> auths =
						AuthorityUtils
								.commaSeparatedStringToAuthorityList(
										authorities
								);

				Authentication authentication =
						new UsernamePasswordAuthenticationToken(
								email,
								null,
								auths
						);

				SecurityContextHolder
						.getContext()
						.setAuthentication(authentication);

			} catch (Exception e) {

				response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
				response.getWriter().write("Invalid Token");

				return;
			}
		}

		filterChain.doFilter(request, response);
	}
}