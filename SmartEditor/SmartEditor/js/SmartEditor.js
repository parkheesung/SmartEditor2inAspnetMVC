var oEditors = [];
var EditID = null;
var ImagePopupURL = null;

function CreateEditor(targetID, UploadURLEvent) {
    if (document.getElementById(targetID) == null) {
        alert("대상이 없습니다.");
    } else {
        EditID = targetID;
        if (UploadURLEvent == null) {
            nhn.husky.EZCreator.createInIFrame({
                oAppRef: oEditors,
                elPlaceHolder: EditID,
                sSkinURI: "/SmartEditor/SmartEditor2Skin_noImg.html",
                htParams: {
                    bUseToolbar: true,
                    bUseVerticalResizer: true,
                    bUseModeChanger: true,
                    fOnBeforeUnload: function () {
                    }
                },
                fOnAppLoad: function () {
                    $("#" + EditID).css("display", "none");
                },
                fCreator: "createSEditor2"
            });
        } else {
            ImagePopupURL = UploadURLEvent;
            nhn.husky.EZCreator.createInIFrame({
                oAppRef: oEditors,
                elPlaceHolder: EditID,
                sSkinURI: "/SmartEditor/SmartEditor2Skin.html",
                htParams: {
                    bUseToolbar: true,
                    bUseVerticalResizer: true,
                    bUseModeChanger: true,
                    fOnBeforeUnload: function () {
                    }
                },
                fOnAppLoad: function () {
                    $("#" + EditID).css("display", "none");
                },
                fCreator: "createSEditor2"
            });
        }
    }
}

function getUploadURL() {
    if (ImagePopupURL != null) {
        try {
            ImagePopupURL();
        } catch (e) {
            alert(e.message);
        }
    } else {
        alert("사진업로드는 금지되어 있습니다.");
    }
}

function pasteHTML(Tags) {
    if (EditID == null || document.getElementById(EditID) == null) {
        alert("Find not EditID");
    } else {
        oEditors.getById[EditID].exec("PASTE_HTML", [Tags]);
    }
}

function getHTML() {
    if (EditID == null || document.getElementById(EditID) == null) {
        return "";
    } else {
        return oEditors.getById[EditID].getIR();
    }
}

function EditConfirm(callback) {
    if (EditID == null || document.getElementById(EditID) == null) {
        alert("에디터를 찾을 수 없습니다.");
    } else {
        oEditors.getById[EditID].exec("UPDATE_CONTENTS_FIELD", []);
        callback();
    }
}

function ImagePopupReady() {
    nhn.husky.SE2M_AttachQuickPhoto = jindo.$Class({
        name: "SE2M_AttachQuickPhoto"
    });

    if (document.getElementById("btnUploader") != null) {
        document.getElementById("btnUploader").onclick = function () {
            parent.getUploadURL();
        }
    }
}

function EditSubmit(frmID) {
    if (EditID == null || document.getElementById(EditID) == null) {
        alert("에디터를 찾을 수 없습니다.");
    } else if (frmID == null || document.getElementById(frmID) == null) {
        alert("전송할 폼을 찾을 수 없습니다.");
    } else {
        $("#" + EditID).val(escape($("#" + EditID).val()));
        $("#" + frmID).submit();
    }
}