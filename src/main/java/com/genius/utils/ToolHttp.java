package com.genius.utils;

import java.io.IOException;
import java.security.KeyManagementException;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.UUID;

import javax.net.ssl.SSLContext;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.TrustStrategy;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.ssl.SSLContextBuilder;
import org.apache.http.util.EntityUtils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.jfinal.template.stat.ast.Set;


public class ToolHttp {

	public static String doGet(boolean isHttps, String url) {
		CloseableHttpClient httpClient = null;
		try {
			if (!isHttps) {
				httpClient = HttpClients.createDefault();
			} else {
				httpClient = createSSLInsecureClient();
			}
			HttpGet httpget = new HttpGet(url);

			
			CloseableHttpResponse response = httpClient.execute(httpget);
			if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
				HttpEntity entity = response.getEntity();

				System.out.println("entity:"+entity);
				if (entity != null) {
					String out = EntityUtils.toString(entity, "utf-8");
					return out;
				}

			}
		} catch (ClientProtocolException e) {
			e.printStackTrace();
			return null;
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		} finally {
			try {
				if (null != httpClient) {
					httpClient.close();
				}
			} catch (IOException e) {
				
			}
		}
		return null;
	}
	
	public static String doGet(boolean isHttps, String url,JSONObject params) {
		String paramStr = "?";
		for(String key:params.keySet()) {
			if("?".equals(paramStr)) {
				paramStr +=key;
			} else {
				paramStr +="&"+key;
			}
			paramStr += "="+params.getString(paramStr);
		}
		
		url =url+paramStr;
		return doGet(isHttps, url);
	}
	
	public static String doPost(boolean isHttps, String url, String data, String contentType){

		CloseableHttpClient httpClient = null;
		try {
			if(!isHttps) {
				httpClient = HttpClients.createDefault();
			} else {
				httpClient = createSSLInsecureClient();
			}
			HttpPost httpPost = new HttpPost(url);
			if(null !=data) {
				StringEntity stringEntity = new StringEntity(data, "UTF-8");
				stringEntity.setContentEncoding("UTF-8");
				if (null != contentType) {
					stringEntity.setContentType(contentType);
				} else {
					stringEntity.setContentType("application/json");
				}
				httpPost.setEntity(stringEntity);
			}
			RequestConfig requestConfig = RequestConfig.custom().setSocketTimeout(200000).setConnectTimeout(200000).build();// 设置请求和传输超时时间
			httpPost.setConfig(requestConfig);
			
			HttpResponse response = httpClient.execute(httpPost);
			
			if (response.getStatusLine().getStatusCode() == HttpStatus.SC_OK) {
				HttpEntity entity = response.getEntity();
				if (entity != null) {
					String out = EntityUtils.toString(entity,  "UTF-8");
					return out;
				}
			}
			
		} catch (Exception e) {
			System.out.println("系统异常");
			e.printStackTrace();
		} finally {
			try {
				if (null != httpClient) {
					httpClient.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return null;
	}
	
	public static String doPost(boolean isHttps,String url,JSONObject data,String contentType) {
		String postData = data.toJSONString();
		return doPost(isHttps, url, postData, contentType);
	}
	
	public static String doPost(boolean isHttps,String url,Map<String, Object> data,String contentType) {
		String postData = new JSONObject(data).toJSONString();
		return doPost(isHttps, url, postData, contentType);
	}
	
	public static JSONObject doPost_toJSON(boolean isHttps,String url,JSONObject data,String contentType) {
		String result = doPost(isHttps, url, data, contentType);
		if(result !=null) return JSONObject.parseObject(result);
		return new JSONObject();
	}
	
	public static JSONObject doPost_toJSON(boolean isHttps,String url,Map<String, Object> data,String contentType) {
		String result = doPost(isHttps, url, data, contentType);
		if(result !=null) return JSONObject.parseObject(result);
		return new JSONObject();
	}
	
	/**
	 * HTTPS访问对象，信任所有证书
	 * 
	 * @return
	 */
	public static CloseableHttpClient createSSLInsecureClient() {
		try {
			SSLContext sslContext = new SSLContextBuilder().loadTrustMaterial(null, new TrustStrategy() {
				// 信任所有
				public boolean isTrusted(X509Certificate[] chain, String authType) throws CertificateException {
					return true;
				}
			}).build();
			SSLConnectionSocketFactory sslsf = new SSLConnectionSocketFactory(sslContext);
			return HttpClients.custom().setSSLSocketFactory(sslsf).build();
		} catch (KeyManagementException e) {
			e.printStackTrace();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (KeyStoreException e) {
			e.printStackTrace();
		}
		return HttpClients.createDefault();
	}

}
