export const environment = {
  production: true,
    //ProtheusUrl : 'https://jvd60103358.jv01.local:8092',
 
    getServerUrl(){
      return localStorage.getItem("serverUrl");
    }
};

