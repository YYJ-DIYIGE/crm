{% extends './layout.tpl' %}

{% block css %}
<link rel="stylesheet" href="/stylesheets/style.css"/>
<link rel="stylesheet" href="/stylesheets/login.css"/>
{% endblock %}

{% block content %}
  <div class="page-body">
    <div class="login-section">
      <div class="login-content">
        <div class="login-title">MERCEDS-BENZ</div>
        <div class="form-section">
          <div class="form-item">
            <input id="userPhone" type="text" class="form-input" placeholder="请输入你的手机"/>
          </div>
          <div class="form-item">
            <input id="userPassword" type="password" class="form-input" placeholder="请输入你的密码"/>
          </div>
          <div class="form-item">
            <button id="userSubmit" class="form-button">马上登录</button>
          </div>
        </div>
      </div>
    </div>
  </div>
{% endblock %}

{% block js %}
<script src="https://lib.baomitu.com/jquery/3.3.1/jquery.min.js"></script>
<script type="text/javascript">
  const PAGE = {
    init:function(){
      this.bind();
    },
    bind:function(){
      $('#userSubmit').on('click',this.Submit);
    },
    Submit:function(){
      let phone = $('#userPhone').val().trim();
      let password = $('#userPassword').val().trim();
      if (!phone || !password) {
        alert('请输入账号密码')
        return
      }
      $.ajax({
        type: 'POST',
        url: '/api/login',
        data:{phone,password},
        beforeSend: function() {
          $("#userSubmit").attr("disabled",true);
        },
        success: (res) => {
          if(res.code === 200) {
            alert('登陆成功！');
            location.href = '/admin/user/clue';
          }else {
            alert('请输入正确的账号密码！');
           }
        },
        error: (err) => {
        console.log(err)
        },
        complete: function() {
          $("#userSubmit").attr("disabled",false);
        }
      }),
      $('#userPhone').val('');
      $('#userPassword').val('');
    }
  }
  PAGE.init();
</script>
{% endblock %}