<?php
if(!isset($GLOBALS['_vars'])) $GLOBALS['_vars'] = array(); 
$fields = array();
?><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=<?php echo $cfg_soft_lang; ?>">
<title>Ա������</title>
<link rel="stylesheet" type="text/css" href="css/base.css">
<style>
.napisdiv {left:10;top:0;width:150px;height:100px;position:absolute;z-index:3}
</style><script src="/js/jquery.min.js"></script>
<script language="javascript" src="/js/dedeajax2.js"></script>
<script language="javascript" src="/js/main.js"></script>
<script language="javascript" src="/js/listbody.js"></script>

<script language="javascript">
function ChangeImage(surl,swidth,sheight){ document.getElementById('picview').src = surl;document.getElementById('picview').width = swidth;document.getElementById('picview').height = sheight; }


function isdel(id){
		if(confirm('��ȷ��Ҫɾ����������')){
			location.href='?dopost=del&id='+id;
		}
	}



</script>

</head>
<body leftmargin="8" topmargin="8" background='images/allbg.gif'  >
<div id="floater" class="napisdiv">
<a href="javascript:;" onClick="ChangeImage('../include/dialog/img/picviewnone.gif',16,16);">
	<img src='../include/dialog/img/picviewnone.gif' id='picview' name='picview' border='0' alt='�����ر�Ԥ��' style='z-index:10000'>
</a>
</div>
<SCRIPT language=JavaScript src="js/float.js"></SCRIPT>
<!--  ����ת��λ�ð�ť  --><!--  ��������  -->
  <table width='98%'  border='0' cellpadding='1' cellspacing='1' bgcolor='#cfcfcf' align="center" style="margin-top:8px">
    <tr bgcolor='#EEF4EA'background='images/wbg.gif' >
     
     
     <td >
 <div style="float:left">
 <form name='form5' action='emp_list.php' method='get'>
  �� <B><?php echo $GLOBALS['positionname']; ?></b>Ա������&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
     
    
                 &nbsp;&nbsp;&nbsp;&nbsp;
              <select name='depid' style='width:150px'>
                <option value='0'>ѡ����...</option>
                
          	<?php echo $GLOBALS['optionarr']; ?>
          
              </select>&nbsp; �ؼ��֣�<input type='text' name='keyword' value='<?php echo $GLOBALS['keyword']; ?>' style='width:120px' />
               <input name="imageField" type="submit" value="����" class='np coolbg' />
            
            
  </form>            
     </div>

            
            
               <div style="float:right;padding-right:6px;padding-top:6px;">
   	<a href='emp_add.php' class='np coolbg'>����</a>
   </div>
</td>
         

    </tr>
  </table>


<!--  �����б�   -->
<table width="98%" border="0" cellpadding="2" cellspacing="1" bgcolor="#CFCFCF" align="center" style="margin-top:8px">
 
  <tr align="right" bgcolor="#F9FCEF">
  <td height="36" colspan="8" align="center">  <?php
$atts = array();
$atts['tagname'] = 'pagelist';
$atts['listsize'] = '3';
 echo $this->refObj->GetPageList($atts,$this->refObj,$fields); 
?>
 </td>
  </tr>
  <form name="form2">
    <tr align="center" bgcolor="#FBFCE2" height="25">
      <td width="6%"><a href="?orderway=<?php echo $neworderway;?>&orderby=id&depid=<?php echo $depid?>&keyword=<?php echo $GLOBALS['keyword']; ?>"><b>ID</b></a></td>
       <td>Ա�����</td>
       <td>Ա������</td>
       <td>�Ա�</td>
       <td>��������</td>
       <td>��Ƭ</td>
       <td>��������</td>
      <td>����</td>
    </tr>
    <?php
$atts = array();
$atts['tagname'] = 'datalist';
$blockValue = $this->refObj->GetArcList($atts,$this->refObj,$fields); 
if(is_array($blockValue)){
foreach( $blockValue as $key=>$fields )
{
?>
    <tr align='center' bgcolor="#FFFFFF" 	height="22" onMouseMove="javascript:this.bgColor='#009FCC';" onMouseOut="javascript:this.bgColor='#FFFFFF';">
      <td nowrap> <a href="crm.php?mid=<?php echo $fields['id']; ?>&search_type=buyid"><?php echo $fields['id']; ?></a> </td>
      <td nowrap> <a href="crm.php?mid=<?php echo $fields['id']; ?>&search_type=buyid"><?php echo $fields['empid']; ?></a> </td>
      <td nowrap> <a href="crm.php?mid=<?php echo $fields['id']; ?>&search_type=buyid"><?php echo $fields['empname']; ?></a> </td>
            <td nowrap> <a href="crm.php?mid=<?php echo $fields['id']; ?>&search_type=buyid"><?php echo $fields['sex']; ?></a> </td>
      <td style="white-space:nowrap;"><a href='emp_list.php?depid=<?php echo $fields['depid']; ?>'><?php echo GetDepname($fields['depid']); ?></a></td>
      <td style="white-space:nowrap;"><?php echo Getface($fields['face']); ?></td>
      <td style="white-space:nowrap;"><?php echo GetDateMk($fields['updatedate']); ?></td>
 
      <td>      
<a href='emp_edit.php?id=<?php echo $fields['id']; ?>'>�༭ </a>

   <a href='javascript:isdel(<?php echo $fields['id'];?>);'>ɾ��</a></td>
    </tr>
    
    
    
    
    
   
    
    
    
    <?php
}
}?>
   
  </form>
  <tr align="right" bgcolor="#F9FCEF">
      </td> <td height="36" colspan="8" align="center"> <?php
$atts = array();
$atts['tagname'] = 'pagelist';
$atts['listsize'] = '3';
 echo $this->refObj->GetPageList($atts,$this->refObj,$fields); 
?>
 </td>
  </tr>
</table>
</body>
</html>