<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{seo.title}}</title>
    <link rel="stylesheet" href="/stylesheets/reset.css"/>
    <link rel="stylesheet" href="/stylesheets/styles.css"/>
    {% block css %}
    {% endblock %}
</head>
<body>
  <div class="wrapper">
    <header class="page-header">
      <div class="header-logo">
         <img src="/images/logo-desktop.png" alt="logo-desktop"/>
      </div>
      <div class="user-info">
        <span>{{userInfo.name}}</span>
        <a class="logout" id="out" >退出</a>
      </div>
    </header>
    <div class="page-body">
      <div class="page-aside">
        <nav class="page-nav">
          <ul>
            <li>
              {% if userInfo.id == 1 %}
              <a class="page-nav-item {% if nav == 'user' %}active{% endif %}" href="/admin/user">人员管理</a>
              {% endif %}
            </li>
            <li>
              <a class="page-nav-item {% if nav == 'clue' %}active{% endif %}" href="/admin/user/clue">线索管理</a>
            </li>
          </ul>
        </nav>
      </div>
      <div class="page-content">
        {% block content %}
        {% endblock %}
      </div>
    </div>
    <footer class="page-footer">Copyright © 2019 极客学院体验技术部出品</footer>
  </div>

    {% block js %}
  <script src="https://lib.baomitu.com/jquery/3.3.1/jquery.min.js"></script>
  <script type="text/javascript">
    let out = document.getElementById('out');
    out.addEventListener('click',function(){
      $.ajax({
        type: 'POST',
        url: '/api/out',
        success: res =>{
          location.href = '/login';
        },
        error: err =>{
          console.log(err)
        }
      })
    })
  </script>
    {% endblock %}
</body>
</html>