<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{title}}</title>
    {% block css %}
    {% endblock %}
</head>
<body>
  <div class="page-header">
    <div class="header-logo">
      <img src="/images/logo-desktop.png" alt="logo-desktop"/>
    </div>
  </div>
    {% block content %}
    
    {% endblock %}
  <footer class="page-footer">Copyright © 2019 极客学院体验技术部出品</footer>
    {% block js %}

    {% endblock %}
</body>
</html