;"use strict";

const DB = {};

{
    DB.company = {
        "215-81-80361": {
            name: "유정정보시스템 (주)",
            id: "215-81-80361",
            representative: "유준수",
            member: {
                "최중식": {
                    name: "최중식",
                    m: "01054722808",
                    e: "choi@ujung.co.kr"
                }
            }
        },
        "120-87-62733": {
            name: "주식회사 엑스게이트",
            id: "215-81-80361",
            representative: "주갑수"
        },
        "214-81-92879": {
            name: "(주) 텔레트론",
            id: "214-81-92879",
            representative: "정재성"
        },
        "119-86-78316": {
            name: "케이네트웍스(주)",
            id: "214-81-92879",
            representative: "이재원,김승일"
        },
        "105-86-01287": {
            name: "(주)성산정보시스템",
            id: "105-86-01287",
            representative: "김기주"
        },
        "120-86-07747": {
            name: "에스케이인포섹 (주)",
            id: "120-86-07747",
            representative: "이용환",
            member: {
                "백승진": {
                    name: "백승진",
                    m: "01063344524"
                }
            }
        },
        "201-86-04729": {
            name: "주식회사 케이티 서비스 북부",
            id: "201-86-04729",
            representative: "이성규",
            member: {
                "이용진": {
                    name: "이용진"
                }
            }
        },
        "113-86-32587": {
            name: "지성정보 주식회사",
            id: "113-86-32587",
            representative: "정진모,이수호"
        }
        /*"229-81-12824": {
            name: "(주)콤텍시스템",
            id: "229-81-12824",
            representative: "권창완",
            member: {
                }
            }
        }*/
    };

    DB.payment = {
        "1": "익월말 현금"
    };

    DB.status = {
        "1": "예정",
        "2": "확정"
    };

    DB.project = {
        "1": {
            id: 1,
            name: "다니엘종합병원 AXGATE 2300 유지보수",
            deposit: 2275000,
            contract: "2020-06-10",
            start: "2020-05-01",
            end: "2021-04-30",
            payment: 1,
            content: "",
            customer: "215-81-80361",
            manager: "최중식",
            status: 1
        },
        "2": {
            id: 2,
            name: "케이티서비스 NMS 개발 용역",
            deposit: 45000000,
            contract: "2019-11-21",
            start: "2019-11-21",
            end: "2020-11-20",
            payment: 1,
            content: "",
            customer: "201-86-04729",
            manager: "이용진",
            status: 1
        },
        "3": {
            id: 3,
            name: "2020년 미래로시스템 보안솔루션 유지보수_NAC",
            deposit: 3750000,
            contract: "2020-04-01",
            start: "2020-04-01",
            end: "2020-12-31",
            payment: 1,
            content: "",
            customer: "120-86-07747",
            manager: "백승진",
            status: 1
        }
    };

    DB.item = {
        "3": {
            "1": {
                expect: "2020-04-27",
                confirm: "",
                invoice: "20200427-10000000-92005452",
                amount: 937500,
                type: 1
            },
            "2": {
                expect: "2020-06-11",
                confirm: "",
                invoice: "20200611-10000000-39142338",
                amount: 937500,
                type: 1
            }
        }
    };
/*
    DB.manager = {
        "215-81-80361": {
        },
        "120-87-62733": {
        },
        "214-81-92879": {
        },
        "119-86-78316": {
        },
        "105-86-01287": {
        }
    }
*/
    function _Request() {
        this.initialize(arguments);
    }

    function get(request) {
        try {
            switch(request.target) {
            case "company":
                return {
                    status: 200,
                    responseText: JSON.stringify(DB.company)
                };
            case "manager":
                return {
                    status: 200,
                    responseText: JSON.stringify(DB.company[request.company].member || {})
                };
            case "project":
                return {
                    status: 200,
                    responseText: JSON.stringify(request.id? DB.project[request.id]: DB.project)
                };
            case "item":
                return {
                    status: 200,
                    responseText: JSON.stringify(request.project? DB.item[String(request.project)]: DB.item)
                }
            default:
                return {
                    status: 400,
                    error: `Target ${request.target || ""} not found.`
                }
            }
        } catch (e) {
            return {
                status: 400,
                error: e.message
            }
        }
    }

    _Request.prototype = {
        initialize: function (args) {

        },
        execute: function (request, callback) {
            switch(request.command) {
            case "get":
                callback.call(get(request));

                break;
            }
        }
    };
}