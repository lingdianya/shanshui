<?php
/**
 * 后台管理菜单项
 *
 * @version        $Id: inc_menu.php 1 10:32 2010年7月21日Z tianya $
 * @package        DedeCMS.Administrator
 * @copyright      Copyright (c) 2007 - 2010, DesDev, Inc.
 * @license        http://help.dedecms.com/usersguide/license.html
 * @link           http://www.dedecms.com
 */
require_once(dirname(__FILE__)."/../config.php");

//载入可发布频道
$addset = '';

//检测可用的内容模型
if($cfg_admin_channel = 'array' && count($admin_catalogs) > 0)
{
    $admin_catalog = join(',', $admin_catalogs);
    $dsql->SetQuery(" SELECT channeltype FROM `#@__arctype` WHERE id IN({$admin_catalog}) GROUP BY channeltype ");
}
else
{
    $dsql->SetQuery(" SELECT channeltype FROM `#@__arctype` GROUP BY channeltype ");
}
$dsql->Execute();
$candoChannel = '';
while($row = $dsql->GetObject())
{
    $candoChannel .= ($candoChannel=='' ? $row->channeltype : ','.$row->channeltype);
}
if(empty($candoChannel)) $candoChannel = 1;
$dsql->SetQuery("SELECT id,typename,addcon,mancon FROM `#@__channeltype` WHERE id IN({$candoChannel}) AND id<>-1 AND isshow=1 ORDER BY id ASC");
$dsql->Execute();
while($row = $dsql->GetObject())
{
    $addset .= "  <m:item name='{$row->typename}' ischannel='1' link='{$row->mancon}?channelid={$row->id}' linkadd='{$row->addcon}?channelid={$row->id}' channelid='{$row->id}' rank='' target='main' />\r\n";
}
//////////////////////////

$adminMenu1 = $adminMenu2 = '';
if($cuserLogin->getUserType() >= 10)
{
    $adminMenu1 = "
";
$adminMenu2 = "




    ";
}
$remoteMenu = ($cfg_remote_site=='Y')? "<m:item name='远程服务器同步' link='makeremote_all.php' rank='sys_ArcBatch' target='main' />" : "";
$menusMain = "
-----------------------------------------------

<m:top item='1_' name='常用操作' display='block'>
  <m:item name='添加文档' link='catalog_do.php?channelid=0&cid=0&dopost=addArchives' rank='sys_Feedback' target='main' />
  <m:item name='栏目管理' link='catalog_main.php' ischannel='1' addalt='创建栏目' linkadd='catalog_add.php?listtype=all' rank='t_List,t_AccList' target='main' />
  <m:item name='所有文档' link='content_list.php' rank='a_List,a_AccList' target='main' />
  <m:item name='幻灯片' link='ppt_main.php' rank='sys_Feedback' target='main' />
  <m:item name='会员申请' link='diy_list.php?action=list&diyid=1' rank='sys_MakeHtml' target='main' />
  <m:item name='首页合作伙伴' link='friendlink_main.php' rank='sys_MakeHtml' target='main' />
  <m:item name='首页相关编辑' link='ad_main.php' rank='sys_MakeHtml' target='main' />
  <m:item name='留言管理' link='guestbook.php' rank='sys_MakeHtml' target='main' />
</m:top>

<m:top item='1_' name='更新网站' display='block'>
   
  <m:item name='更新首页' link='makehtml_homepage.php' rank='sys_MakeHtml' target='main' />
  <m:item name='更新栏目' link='makehtml_list.php' rank='sys_MakeHtml' target='main' />
  <m:item name='更新文档' link='makehtml_archives.php' rank='sys_MakeHtml' target='main' />
  <m:item name='一键更新' link='makehtml_all.php' rank='sys_MakeHtml' target='main' />
  
  
</m:top>
<m:top item='1_' name='系统设置' display='none' rank='sys_User,sys_Group,sys_Edit,sys_Log,sys_Data'>
  <m:item name='网站设置' link='sys_info.php' rank='sys_Edit' target='main' />
  <m:item name='用户管理' link='sys_admin_user.php' rank='sys_User' target='main' />
  <m:item name='表单管理' link='diy_main.php' rank='c_List' target='main' />
  <m:item name='图片水印' link='sys_info_mark.php' rank='sys_Edit' target='main' />
  <m:item name='更新系统缓存' link='sys_cache_up.php' rank='sys_ArcBatch' target='main' />
  <m:item name='网站备份/还原' link='sys_data.php' rank='sys_Data' target='main' />
  <m:item name='回收站' link='recycling.php' ischannel='1' addalt='清空回收站' addico='images/gtk-del.png' linkadd='archives_do.php?dopost=clear&aid=no&recycle=1' rank='a_List,a_AccList,a_MyList' target='main' />
  
  
  
</m:top>
<m:top item='1_' name='附件管理' display='none' rank='sys_Upload,sys_MyUpload,plus_文件管理器'>
  <m:item name='上传新文件' link='media_add.php' rank='' target='main' />
  <m:item name='附件数据管理' link='media_main.php' rank='sys_Upload,sys_MyUpload' target='main' />
  <m:item name='文件式管理器' link='media_main.php?dopost=filemanager' rank='plus_文件管理器' target='main' />
</m:top>

$adminMenu1

 
<m:top item='5_' name='HTML更新' notshowall='1' display='none' rank='sys_MakeHtml'>
  <m:item name='更新首页' link='makehtml_homepage.php' rank='sys_MakeHtml' target='main' />
  <m:item name='更新栏目' link='makehtml_list.php' rank='sys_MakeHtml' target='main' />
  <m:item name='更新文档' link='makehtml_archives.php' rank='sys_MakeHtml' target='main' />
  <m:item name='更新地图' link='makehtml_map_guide.php' rank='sys_MakeHtml' target='main' />
  <m:item name='更新RSS文件' link='makehtml_rss.php' rank='sys_MakeHtml' target='main' />
  <m:item name='获取JS文件' link='makehtml_js.php' rank='sys_MakeHtml' target='main' />
</m:top>
<m:top item='5_' name='自动任务' notshowall='1'  display='block' rank='sys_MakeHtml'>
  <m:item name='一键更新网站' link='makehtml_all.php' rank='sys_MakeHtml' target='main' />
  <m:item name='更新系统缓存' link='sys_cache_up.php' rank='sys_ArcBatch' target='main' />
  {$remoteMenu}
</m:top>

$adminMenu2


-----------------------------------------------
";