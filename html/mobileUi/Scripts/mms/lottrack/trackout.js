$("document").ready(function () {
    $("#txtLotID").focus();
});
$(function () {
    $("#txtLotID").keyup(function (event) {
        if (event.keyCode === 13) {
            //获取Lot信息
            var lotID = $("#txtLotID").val();
            GetLotInfo(lotID);

        }
    });
});

function GetLotInfo(lotID) {
    $.ajax({
        url: "../LotTrack/GetLotInfo",
        type: "Post",
        data: { "sLotID": lotID },
        success: function (result) {
            if (result.Result) {
                var listFileds = result.Data.Fileds;
                $("#tbFileds").empty();
                for (var i = 0; i < listFileds.length; i++) {
                    $("#tbFileds").append("<tr><td>" + listFileds[i].Caption + "</td><td>" + listFileds[i].Value + "</td></tr>");
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

function TrackOutLot() {
    var lotID = $("#txtLotID").val();
    if ("" === lotID) {
        layer.alert("请扫描随件单批次号!",
            {
                skin: 'layui-layer-lan',
                title: '操作结果',
                closeBtn: 0,
                icon: 5,
                shift: 6 //动画类型
            });
        return;
    }
    $.ajax({
        url: "../LotTrack/TrackOutLot",
        type: "Post",
        data: { "sLotID": lotID},
        success: function (result) {
            if (result.Result) {
                layer.alert("出站成功!",
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