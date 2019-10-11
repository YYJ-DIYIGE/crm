const PAGE = {
  init: function(){
    this.bind();
  },
  bind: function(){
    $('#clueSubmit').on('click',this.Submitted);
    $('#logSubmit').on('click',this.addSubm);
  },
  Submitted: function(){
    let status = Number($('#clueStatus').val());
    let user_id = $('#clueUserId').val();
    let remark = $('#clueRemark').val();
    let id = $('#clueId').val();
    if (!status || !user_id || !remark || !id) {
      alert('请输入必要参数！！！')
      return
    }
    $.ajax({
      type: 'PUT',
      url: '/api/clue/' + id,
      data:{status,user_id,remark},
      beforeSend: ()=>{
       $('#clueSubmit').attr('disabled',true);
      },
      success: res =>{
        if (res.code === 200) {
          alert('编辑成功!')
        }else{
          alert(res.massage)
        }
      },
      error: err =>{
        console.log(err)
      },
      complete: () =>{
        $('#clueSubmit').attr('disabled',false);
      }
    })
  },
  addSubm: ()=>{
    let content = $('#logContent').val();
    let id = $('#clueId').val();
    if (!content) {
      alert('请输入内容')
      return
    }
    $.ajax({
      type: 'POST',
      url: '/api/clue/'+id,
      data:{content},
      beforeSend: ()=>{
        $("#logSubmit").attr("disabled",true);
      },
      success: res =>{
        if (res.code === 200) {
          alert('添加成功')
          location.reload();
        }else{
          alert(res.massage)
        }
      },
      error: err =>{
        console.log(err)
      },
      complete: ()=>{
        $("#logSubmit").attr("disabled",false);
      }
    })
  }
}
PAGE.init();