$("document").ready(function() {
    $("#txtLotID").focus();
});
$(function() {
    $("#txtLotID").keyup(function (event) {
        if (event.keyCode === 13) {
            //获取Lot信息
            var lotID = $("#txtLotID").val();
            GetLotInfo(lotID);
        }
    });
});

function GetBarcode(device,operation) {
    $.ajax({
        url: "../LotTrack/GetBarcode",
        type: "Post",
        data: { "device": device,"operation":operation },
        success:
            function (result) {
                if (result.Result) {
                    $("#divBarcode").show();
                    $("#imgCode").JsBarcode(result.Data, {
                    width: 1,// 设置条之间的宽度
                    height: 18,// 高度
                    // displayValue:true, // 是否在条形码上下方显示文字
                    // fontOptions:"bold italic", // 使文字加粗体或变斜体
                    // font:"fantasy", // 设置文本的字体
                    // textAlign:"left", // 设置文本的水平对齐方式
                    // textPosition:"top", // 设置文本的垂直位置
                    // textMargin:5, // 设置条形码和文本之间的间距
                    // fontSize:15, // 设置文本的大小
                    // background:"#eee", // 设置条形码的背景
                    // lineColor:"#2196f3", // 设置条和文本的颜色。
                     margin:1 // 设置条形码周围的空白边距
                });
            }
            else {
                    $("#divBarcode").hide();
            }
        }
    }
    );
}

function GetLotInfo(lotID) {
    $.ajax({
        url: "../LotTrack/GetLotInfo",
        type: "Post",
        data: { "sLotID": lotID},
        success: function (result) {
            if (result.Result) {
                var listFileds = result.Data.Fileds;
                $("#tbFileds").empty();
                for (var i = 0; i < listFileds.length; i++) {
                    $("#tbFileds").append("<tr><td>" + listFileds[i].Caption + "</td><td>" + listFileds[i].Value+"</td></tr>");
                }
                $("#tbWafers").empty();
                var listWafers = result.Data.LotDetail.Units;
                for (var j = 0; j < listWafers.length; j++) {
                    $("#tbWafers").append("<tr><td>" + listWafers[j].UnitID + "</td><td>" + listWafers[j].SlotNo + "</td><td>" + listWafers[j].Status + "</td></tr>");
                }
                var lotInfo = result.Data.LotDetail;
                $("#txtShowLotID").text(lotInfo.LotID);
                $("#txtProcess").text(lotInfo.Process);
                $("#txtStageID").text(lotInfo.StageID);
                $("#txtRoute").text(lotInfo.Route);
                $("#txtOperation").text(lotInfo.Operation);
                $("#txtJssiLotStatus").text(lotInfo.JssiLotStatus);
                $("#txtDeviceName").text(lotInfo.DeviceName);
                $("#txtWaferSize").text(lotInfo.WaferSize);
                $("#txtWaferQty").text(lotInfo.WaferQty);
                $("#txtDieQty").text(lotInfo.DieQty);
                $("#txtCreatedTime").text(lotInfo.CreatedTime);
                $("#txtEqpCode").focus();
                GetBarcode(lotInfo.DeviceName, lotInfo.Operation);
            } else {
                layer.alert("查询Lot信息失败:" + result.Msg,
                    {
                        skin: 'layui-layer-lan',
                        title: '操作结果',
                        closeBtn: 0,
                        icon: 5,
                        shift: 6 //动画类型
                    });
            }
        }
    });
}

function TrackInLot() {
    var lotID = $("#txtLotID").val();
    var eqpID = $("#txtEqpCode").val();
    if (""===lotID) {
        layer.alert("进站失败:请扫描随件单批次号!",
            {
                skin: 'layui-layer-lan',
                title: '操作结果',
                closeBtn: 0,
                icon: 5,
                shift: 6 //动画类型
            });
        return;
    }
    if (""===eqpID) {
        layer.alert("进站失败:请扫描机台编号!",
            {
                skin: 'layui-layer-lan',
                title: '操作结果',
                closeBtn: 0,
                icon: 5,
                shift: 6 //动画类型
            });
        return;
    }

    var npStart = lotID.indexOf("NP");
    var result = true;
   // TrackIn(lotID, eqpID);
    if (npStart === 0) {
        $.ajax({
            url: "../LotTrack/GetLotOperation",
            type: "Post",
            data: { "lotId": lotID },
            success: function(result) {
                if (result.Result) {
                    if (result.Data === "BP01-ZQ" || result.Data === "BP01-CL01" || result.Data === "MK01" || result.Data === "GD01-JM" || result.Data === "BC01") {
                        $.ajax({
                            url: "../LotTrack/CheckNpLotData",
                            type: "Post",
                            data: { "lotId": lotID, "eqpId": eqpID },
                            success: function(result) {
                                if (result.Result === false) {
                                    layer.alert("进站失败:请先进行NPData数据收集操作!",
                                        {
                                            skin: 'layui-layer-lan',
                                            title: '操作结果',
                                            closeBtn: 0,
                                            icon: 5,
                                            shift: 6 //动画类型
                                        });
                                    return;
                                } else {
                                    TrackIn(lotID, eqpID);
                                }
                            }
                        });
                    } else {
                        TrackIn(lotID, eqpID);
                    }
                }
            }
        });
    } else {
        TrackIn(lotID, eqpID);
    }
}

function TrackIn(lotID, eqpID) {
    $.ajax({
        url: "../LotTrack/TrackInLot",
        type: "Post",
        data: { "sLotID": lotID, "sEqpCode": eqpID},
        success: function (result) {
            if (result.Result) {
                layer.alert("进站成功!",
                    {
                        skin: 'layui-layer-lan',
                        title: '操作结果',
                        closeBtn: 0,
                        icon: 6,
                        shift: 5,
                        yes: function () {
                            window.location.reload();
                        }
                    });
            } else {
                layer.alert("进站失败:" + result.Msg,
                    {
                        skin: 'layui-layer-lan',
                        title: '操作结果',
                        closeBtn: 0,
                        icon: 5,
                        shift: 6 //动画类型
                    });
            }
        }
    });
}