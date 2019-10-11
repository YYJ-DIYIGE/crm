 const PAGE = {
    init:function() {
      this.bind();
    },
    bind:function() {
      $('#userSubmit').on('click',this.submit);
    },
    submit:function(){
      let name = $('#userName').val().trim();
      let phone = $('#userPhone').val().trim();
      let password = $('#userPassword').val().trim();
      let role = Number($('#userRole').val());
      if (!name || !phone || !password || !role) {
         alert('请输入必要参数');
         return;
      }
      $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/api/user',
        data:{name, phone, password, role},
        beforeSend: () => {
        $('#userSubmit').attr('disable', true);
        },
        success: res =>{
          if (res.code === 200) {
            alert('新增成功');
            location.href = '/admin/user';
          }else {
             alert('res.message');
           }
        },
        error: err =>{
          console.log(err);
        },
        complete: () =>{
          $('#userSubmit').attr('disable', false);
        },
      })
    }
  }
  PAGE.init();