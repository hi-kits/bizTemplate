;(function () {
	'use strict';
    const protocol = window.location.protocol; 
    // 是否是预发环境
    var IS_RELEASE = window.location.href.indexOf('haier.net/release') > -1;
    // 是否验收环境
    var IS_YS = window.location.origin.indexOf('ys-zjrs') > -1;


    /** 生产环境  接口路径 */
    if (IS_YS) {
        var paths = {
            /*----------- 通用接口配置 ----------*/
            // 运营平台接口域名
            // 无网关接口域名
            // 一站式发布平台接口
            // 三翼鸟接口域名
            // 内容发布平台-智家
            SERVER_URL: protocol +  '//zj-yanshou.haier.net/',

            /*----------- 东南亚 ----------*/
            // 东南亚接口域名
            SERVER_URL_SCORD: 'https://uhome-sea.haieriot.net/',
    
            /*----------- 星云系统 ----------*/
            // 星云系统接口域名
            SERVER_URL_NEBULA: protocol + '//zj-yanshou.haier.net/',
                 
            /*----------- 内容发布 ----------*/
            // 内容发布平台接口-三翼鸟
            CON_SYN_SERVER_URL: protocol + '//syntest.haier.net/',
       
            /*----------- 中台 ----------*/
            // 中台-搜索
            SERVER_URL_MPS: protocol + '//zj-yanshou.haier.net/',
    
        }
    } else if (IS_RELEASE) {
        var paths = {
            /*----------- 通用接口配置 ----------*/
            // 运营平台接口域名
            // 无网关接口域名
            // 一站式发布平台接口
            // 三翼鸟接口域名
            // 内容发布平台-智家
            SERVER_URL: protocol + '//zj-pre-release.haier.net/',



            /*----------- 东南亚 ----------*/
            // 东南亚接口域名
            SERVER_URL_SCORD: 'https://uhome-sea.haieriot.net/',



            /*----------- 星云系统 ----------*/
            // 星云系统接口域名
            SERVER_URL_NEBULA: protocol + '//zj-pre-release.haier.net/',
    
            
            
            /*----------- 内容发布 ----------*/
            // 内容发布平台接口-三翼鸟
            CON_SYN_SERVER_URL: protocol + '//zj-pre-release.haier.net/',


            /*----------- 中台 ----------*/
            // 中台-搜索
            SERVER_URL_MPS: protocol + '//mps.haiersmarthomes.com/',
    
        }
    } else {
        var paths = {
            /*----------- 通用接口配置 ----------*/
            // 运营平台接口域名
            // 无网关接口域名
            // 一站式发布平台接口
            // 三翼鸟接口域名
            // 内容发布平台-智家
            SERVER_URL: protocol + '//zj.haier.net/',
    
    
            /*----------- 东南亚 ----------*/
            // 东南亚接口域名
            SERVER_URL_SCORD: 'https://uhome-sea.haieriot.net/',
    
    
            /*----------- 星云系统 ----------*/
            // 星云系统接口域名
            SERVER_URL_NEBULA: protocol + '//syn.haier.net/',
    
            
            /*----------- 内容发布 ----------*/
            // 内容发布平台接口-三翼鸟
            CON_SYN_SERVER_URL: protocol + '//syn.haier.net/',
    
    
            /*----------- 中台 ----------*/
            // 中台-搜索
            SERVER_URL_MPS: protocol + '//mps.haiersmarthomes.com',
    
        }
    }


	window['PATHS'] = paths;
	return window['PATHS'];
}());