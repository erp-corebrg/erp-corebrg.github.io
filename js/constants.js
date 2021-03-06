; "use strict";

const
    CONFIRM_SIGNOUT = {
        kr: "Confirm.\n\n로그 아웃 하겠습니까?"
    },
    CONFIRM_APPLY_MUTE = {
        kr: "Confirm.\n\n브라우저 새로고침 후 반영됩니다.\n계속 하겠습니까?"
    },
    CONFIRM_REMOVE = {
        kr: "Confirm.\n\n삭제하겠습니까?"
    },
    CONFIRM_REMOVE_ITEM = {
        kr: "Confirm.\n\n선택한 아이템을 삭제하겠습니까?"
    },
    INFO_PASSWORD_CHANGED = {
        kr: "Information.\n\n비밀번호 변경 완료."
    },
    INFO_REQUEST_COMPLETE = {
        kr: "Information.\n\n요청 정상 처리."
    },
    ERROR_INVALID_ACCESS = {
        kr: "Error!\n\n잘못된 접근.\n"
    },
    ERROR_NO_FILE = {
        kr: "Error!\n\n존재하지 않는 파일.\n"
    },
    ERROR_INCONST_AMOUNT = (...args) => {
        return {
            kr: `Error!\n\n계약금액 ${args[0].toLocaleString()}과\n매출합계 ${args[1].toLocaleString()} 불일치.`
        }
    },
    ERROR_REMOVE_RESTRICT = {
        kr: "Error!\n\n사용중인 정보는 삭제할수 없습니다.\n"
    },
    ERROR_REQUEST_CODE = {
        kr: "Error!\n\n오류코드"
    },
    ERROR_PASSWORD_CHANGE = {
        kr: "Error!\n\n비밀번호 변경 오류."
    },
    NOTICE_SESSION_EXPIRED = {
        kr: "Notice!\n\n세션 만료."
    },
    NOTICE_NO_AUTH = {
        kr: "Notice!\n\n"+ "권한 없음."
    }