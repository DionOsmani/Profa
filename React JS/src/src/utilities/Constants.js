const API_BASE_URL_DEVELOPMENT = 'http://localhost:5160';
const API_BASE_URL_PRODUCTION = 'http://profa.azurewebsites.net';

const ENDPOINT = {
    GET_ALL_STAFFS: 'get-all-staffs',
    GET_STAFF_BY_ID: 'get-staff-by-id',
    CREATE_STAFF: 'create-staff',
    UPDATE_STAFF: 'update-staff',
    DELETE_STAFF_BY_ID: 'delete-staff-by-id',
    LOGIN: 'api/Staff/login',

    GET_ALL_PRODUCTS: 'get-all-products',
    GET_PRODUCT_BY_ID: 'get-product-by-id',
    CREATE_PRODUCT: 'create-product',
    UPDATE_PRODUCT: 'update-product',
    DELETE_PRODUCT_BY_ID: 'delete-product-by-id',

    GET_ALL_DEPARTMENTS: 'get-all-departments',
    GET_DEPARTMENT_BY_ID: 'get-department-by-id',
    CREATE_DEPARTMENT: 'create-department',
    UPDATE_DEPARTMENT: 'update-department',
    DELETE_DEPARTMENT_BY_ID: 'delete-department-by-id',

    GET_ALL_BRANCHES: 'get-all-branches',
    GET_BRANCH_BY_ID: 'get-branch-by-id',
    CREATE_BRANCH: 'create-branch',
    UPDATE_BRANCH: 'update-branch',
    DELETE_BRANCH_BY_ID: 'delete-branch-by-id',

    GET_ALL_BILLS: 'get-all-bills',
    GET_BILL_BY_ID: 'get-bill-by-id',
    CREATE_BILL: 'create-bill',
    UPDATE_BILL: 'update-bill',
    DELETE_BILL_BY_ID: 'delete-bill-by-id',

    GET_ALL_CUSTOMERS: 'get-all-customers',
    GET_CUSTOMER_BY_ID: 'get-customer-by-id',
    CREATE_CUSTOMER: 'create-customer',
    UPDATE_CUSTOMER: 'update-customer',
    DELETE_CUSTOMER_BY_ID: 'delete-customer-by-id',

    GET_ALL_ISSUES: 'get-all-issues',
    GET_ISSUE_BY_ID: 'get-issue-by-id',
    CREATE_ISSUE: 'create-issue',
    UPDATE_ISSUE: 'update-issue',
    DELETE_ISSUE_BY_ID: 'delete-issue-by-id',

    GET_ALL_EXTRAHOURS: 'get-all-extraHours',
    GET_EXTRAHOUR_BY_ID: 'get-extraHour-by-id',
    CREATE_EXTRAHOUR: 'create-extraHour',
    UPDATE_EXTRAHOUR: 'update-extraHour',
    DELETE_EXTRAHOUR_BY_ID: 'delete-extraHour-by-id',

    GET_ALL_MACHINERIES: 'get-all-machineries',
    GET_MACHINERY_BY_ID: 'get-machinery-by-id',
    CREATE_MACHINERY: 'create-machinery',
    UPDATE_MACHINERY: 'update-machinery',
    DELETE_MACHINERY_BY_ID: 'delete-machinery-by-id',

    GET_ALL_MATERIALS: 'get-all-materials',
    GET_MATERIAL_BY_ID: 'get-material-by-id',
    CREATE_MATERIAL: 'create-material',
    UPDATE_MATERIAL: 'update-material',
    DELETE_MATERIAL_BY_ID: 'delete-material-by-id',

    GET_ALL_REPORTS: 'get-all-reports',
    GET_REPORT_BY_ID: 'get-report-by-id',
    CREATE_REPORT: 'create-report',
    UPDATE_REPORT: 'update-report',
    DELETE_REPORT_BY_ID: 'delete-report-by-id',

    GET_ALL_STAFFPAYMENTS: 'get-all-staffPayments',
    GET_STAFFPAYMENT_BY_ID: 'get-staffPayment-by-id',
    CREATE_STAFFPAYMENT: 'create-staffPayment',
    UPDATE_STAFFPAYMENT: 'update-staffPayment',
    DELETE_STAFFPAYMENT_BY_ID: 'delete-staffPayment-by-id',

    GET_ALL_TOOLS: 'get-all-tools',
    GET_TOOL_BY_ID: 'get-tool-by-id',
    CREATE_TOOL: 'create-tool',
    UPDATE_TOOL: 'update-tool',
    DELETE_TOOL_BY_ID: 'delete-tool-by-id',

    GET_ALL_COMPLAINTS: 'get-all-complaints',
    GET_COMPLAINT_BY_ID: 'get-complaint-by-id',
    CREATE_COMPLAINT: 'create-complaint',
    UPDATE_COMPLAINT: 'update-complaint',
    DELETE_COMPLAINT_BY_ID: 'delete-complaint-by-id',

    GET_ALL_WOODS: 'get-all-woods',
    GET_WOOD_BY_ID: 'get-wood-by-id',
    CREATE_WOOD: 'create-wood',
    UPDATE_WOOD: 'update-wood',
    DELETE_WOOD_BY_ID: 'delete-wood-by-id'
};

const development = {
    API_URL_GET_ALL_STAFFS: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.GET_ALL_STAFFS}`,
    API_URL_GET_STAFF_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.GET_STAFF_BY_ID}`,
    API_URL_CREATE_STAFF: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.CREATE_STAFF}`,
    API_URL_UPDATE_STAFF: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.UPDATE_STAFF}`,
    API_URL_DELETE_STAFF_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.DELETE_STAFF_BY_ID}`,
    API_URL_LOGIN: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.LOGIN}`,

    API_URL_GET_ALL_PRODUCTS: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.GET_ALL_PRODUCTS}`,
    API_URL_GET_PRODUCT_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.GET_PRODUCT_BY_ID}`,
    API_URL_CREATE_PRODUCT: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.CREATE_PRODUCT}`,
    API_URL_UPDATE_PRODUCT: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.UPDATE_PRODUCT}`,
    API_URL_DELETE_PRODUCT_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.DELETE_PRODUCT_BY_ID}`,

    API_URL_GET_ALL_DEPARTMENTS: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.GET_ALL_DEPARTMENTS}`,
    API_URL_GET_DEPARTMENT_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.GET_DEPARTMENT_BY_ID}`,
    API_URL_CREATE_DEPARTMENT: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.CREATE_DEPARTMENT}`,
    API_URL_UPDATE_DEPARTMENT: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.UPDATE_DEPARTMENT}`,
    API_URL_DELETE_DEPARTMENT_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.DELETE_DEPARTMENT_BY_ID}`,

    API_URL_GET_ALL_BRANCHES: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.GET_ALL_BRANCHES}`,
    API_URL_GET_BRANCH_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.GET_BRANCH_BY_ID}`,
    API_URL_CREATE_BRANCH: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.CREATE_BRANCH}`,
    API_URL_UPDATE_BRANCH: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.UPDATE_BRANCH}`,
    API_URL_DELETE_BRANCH_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.DELETE_BRANCH_BY_ID}`,

    API_URL_GET_ALL_BILLS: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.GET_ALL_BILLS}`,
    API_URL_GET_BILL_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.GET_BILL_BY_ID}`,
    API_URL_CREATE_BILL: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.CREATE_BILL}`,
    API_URL_UPDATE_BILL: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.UPDATE_BILL}`,
    API_URL_DELETE_BILL_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.DELETE_BILL_BY_ID}`,

    API_URL_GET_ALL_CUSTOMERS: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.GET_ALL_CUSTOMERS}`,
    API_URL_GET_CUSTOMER_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.GET_CUSTOMER_BY_ID}`,
    API_URL_CREATE_CUSTOMER: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.CREATE_CUSTOMER}`,
    API_URL_UPDATE_CUSTOMER: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.UPDATE_CUSTOMER}`,
    API_URL_DELETE_CUSTOMER_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.DELETE_CUSTOMER_BY_ID}`,

    API_URL_GET_ALL_ISSUES: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.GET_ALL_ISSUES}`,
    API_URL_GET_ISSUE_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.GET_ISSUE_BY_ID}`,
    API_URL_CREATE_ISSUE: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.CREATE_ISSUE}`,
    API_URL_UPDATE_ISSUE: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.UPDATE_ISSUE}`,
    API_URL_DELETE_ISSUE_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.DELETE_ISSUE_BY_ID}`,

    API_URL_GET_ALL_EXTRAHOURS: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.GET_ALL_EXTRAHOURS}`,
    API_URL_GET_EXTRAHOUR_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.GET_EXTRAHOUR_BY_ID}`,
    API_URL_CREATE_EXTRAHOUR: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.CREATE_EXTRAHOUR}`,
    API_URL_UPDATE_EXTRAHOUR: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.UPDATE_EXTRAHOUR}`,
    API_URL_DELETE_EXTRAHOUR_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.DELETE_EXTRAHOUR_BY_ID}`,

    API_URL_GET_ALL_MACHINERIES: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.GET_ALL_MACHINERIES}`,
    API_URL_GET_MACHINERY_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.GET_MACHINERY_BY_ID}`,
    API_URL_CREATE_MACHINERY: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.CREATE_MACHINERY}`,
    API_URL_UPDATE_MACHINERY: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.UPDATE_MACHINERY}`,
    API_URL_DELETE_MACHINERY_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.DELETE_MACHINERY_BY_ID}`,

    API_URL_GET_ALL_REPORTS: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.GET_ALL_REPORTS}`,
    API_URL_GET_REPORT_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.GET_REPORT_BY_ID}`,
    API_URL_CREATE_REPORT: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.CREATE_REPORT}`,
    API_URL_UPDATE_REPORT: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.UPDATE_REPORT}`,
    API_URL_DELETE_REPORT_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.DELETE_REPORT_BY_ID}`,

    API_URL_GET_ALL_MATERIALS: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.GET_ALL_MATERIALS}`,
    API_URL_GET_MATERIAL_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.GET_MATERIAL_BY_ID}`,
    API_URL_CREATE_MATERIAL: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.CREATE_MATERIAL}`,
    API_URL_UPDATE_MATERIAL: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.UPDATE_MATERIAL}`,
    API_URL_DELETE_MATERIAL_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.DELETE_MATERIAL_BY_ID}`,

    API_URL_GET_ALL_STAFFPAYMENTS: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.GET_ALL_STAFFPAYMENTS}`,
    API_URL_GET_STAFFPAYMENT_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.GET_STAFFPAYMENT_BY_ID}`,
    API_URL_CREATE_STAFFPAYMENT: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.CREATE_STAFFPAYMENT}`,
    API_URL_UPDATE_STAFFPAYMENT: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.UPDATE_STAFFPAYMENT}`,
    API_URL_DELETE_STAFFPAYMENT_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.DELETE_STAFFPAYMENT_BY_ID}`,

    API_URL_GET_ALL_TOOLS: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.GET_ALL_TOOLS}`,
    API_URL_GET_TOOL_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.GET_TOOL_BY_ID}`,
    API_URL_CREATE_TOOL: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.CREATE_TOOL}`,
    API_URL_UPDATE_TOOL: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.UPDATE_TOOL}`,
    API_URL_DELETE_TOOL_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.DELETE_TOOL_BY_ID}`,

    API_URL_GET_ALL_WOODS: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.GET_ALL_WOODS}`,
    API_URL_GET_WOOD_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.GET_WOOD_BY_ID}`,
    API_URL_CREATE_WOOD: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.CREATE_WOOD}`,
    API_URL_UPDATE_WOOD: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.UPDATE_WOOD}`,
    API_URL_DELETE_WOOD_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.DELETE_WOOD_BY_ID}`,

    API_URL_GET_ALL_COMPLAINTS: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.GET_ALL_COMPLAINTS}`,
    API_URL_GET_COMPLAINT_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.GET_COMPLAINT_BY_ID}`,
    API_URL_CREATE_COMPLAINT: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.CREATE_COMPLAINT}`,
    API_URL_UPDATE_COMPLAINT: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.UPDATE_COMPLAINT}`,
    API_URL_DELETE_COMPLAINT_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.DELETE_COMPLAINT_BY_ID}`


};

const production = {
    API_URL_GET_ALL_STAFFS: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.GET_ALL_STAFFS}`,
    API_URL_GET_STAFF_BY_ID: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.GET_STAFF_BY_ID}`,
    API_URL_CREATE_STAFF: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.CREATE_STAFF}`,
    API_URL_UPDATE_STAFF: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.UPDATE_STAFF}`,
    API_URL_DELETE_STAFF_BY_ID: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.DELETE_STAFF_BY_ID}`,
    API_URL_LOGIN: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.LOGIN}`,

    API_URL_GET_ALL_PRODUCTS: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.GET_ALL_PRODUCTS}`,
    API_URL_GET_PRODUCT_BY_ID: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.GET_PRODUCT_BY_ID}`,
    API_URL_CREATE_PRODUCT: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.CREATE_PRODUCT}`,
    API_URL_UPDATE_PRODUCT: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.UPDATE_PRODUCT}`,
    API_URL_DELETE_PRODUCT_BY_ID: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.DELETE_PRODUCT_BY_ID}`,

    API_URL_GET_ALL_DEPARTMENTS: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.GET_ALL_DEPARTMENTS}`,
    API_URL_GET_DEPARTMENT_BY_ID: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.GET_DEPARTMENT_BY_ID}`,
    API_URL_CREATE_DEPARTMENT: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.CREATE_DEPARTMENT}`,
    API_URL_UPDATE_DEPARTMENT: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.UPDATE_DEPARTMENT}`,
    API_URL_DELETE_DEPARTMENT_BY_ID: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.DELETE_DEPARTMENT_BY_ID}`,

    API_URL_GET_ALL_BRANCHES: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.GET_ALL_BRANCHES}`,
    API_URL_GET_BRANCH_BY_ID: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.GET_BRANCH_BY_ID}`,
    API_URL_CREATE_BRANCH: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.CREATE_BRANCH}`,
    API_URL_UPDATE_BRANCH: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.UPDATE_BRANCH}`,
    API_URL_DELETE_BRANCH_BY_ID: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.DELETE_BRANCH_BY_ID}`,

    API_URL_GET_ALL_BILLS: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.GET_ALL_BILLS}`,
    API_URL_GET_BILL_BY_ID: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.GET_BILL_BY_ID}`,
    API_URL_CREATE_BILL: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.CREATE_BILL}`,
    API_URL_UPDATE_BILL: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.UPDATE_BILL}`,
    API_URL_DELETE_BILL_BY_ID: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.DELETE_BILL_BY_ID}`,

    API_URL_GET_ALL_CUSTOMERS: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.GET_ALL_CUSTOMERS}`,
    API_URL_GET_CUSTOMER_BY_ID: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.GET_CUSTOMER_BY_ID}`,
    API_URL_CREATE_CUSTOMER: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.CREATE_CUSTOMER}`,
    API_URL_UPDATE_CUSTOMER: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.UPDATE_CUSTOMER}`,
    API_URL_DELETE_CUSTOMER_BY_ID: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.DELETE_CUSTOMER_BY_ID}`,

    API_URL_GET_ALL_ISSUES: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.GET_ALL_ISSUES}`,
    API_URL_GET_ISSUE_BY_ID: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.GET_ISSUE_BY_ID}`,
    API_URL_CREATE_ISSUE: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.CREATE_ISSUE}`,
    API_URL_UPDATE_ISSUE: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.UPDATE_ISSUE}`,
    API_URL_DELETE_ISSUE_BY_ID: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.DELETE_ISSUE_BY_ID}`,

    API_URL_GET_ALL_EXTRAHOURS: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.GET_ALL_EXTRAHOURS}`,
    API_URL_GET_EXTRAHOUR_BY_ID: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.GET_EXTRAHOUR_BY_ID}`,
    API_URL_CREATE_EXTRAHOUR: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.CREATE_EXTRAHOUR}`,
    API_URL_UPDATE_EXTRAHOUR: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.UPDATE_EXTRAHOUR}`,
    API_URL_DELETE_EXTRAHOUR_BY_ID: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.DELETE_EXTRAHOUR_BY_ID}`,

    API_URL_GET_ALL_MACHINERIES: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.GET_ALL_MACHINERIES}`,
    API_URL_GET_MACHINERY_BY_ID: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.GET_MACHINERY_BY_ID}`,
    API_URL_CREATE_MACHINERY: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.CREATE_MACHINERY}`,
    API_URL_UPDATE_MACHINERY: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.UPDATE_MACHINERY}`,
    API_URL_DELETE_MACHINERY_BY_ID: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.DELETE_MACHINERY_BY_ID}`,

    I_URL_GET_ALL_REPORTS: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.GET_ALL_REPORTS}`,
    API_URL_GET_REPORT_BY_ID: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.GET_REPORT_BY_ID}`,
    API_URL_CREATE_REPORT: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.CREATE_REPORT}`,
    API_URL_UPDATE_REPORT: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.UPDATE_REPORT}`,
    API_URL_DELETE_REPORT_BY_ID: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.DELETE_REPORT_BY_ID}`,

    API_URL_GET_ALL_MATERIALS: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.GET_ALL_MATERIALS}`,
    API_URL_GET_MATERIAL_BY_ID: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.GET_MATERIAL_BY_ID}`,
    API_URL_CREATE_MATERIAL: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.CREATE_MATERIAL}`,
    API_URL_UPDATE_MATERIAL: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.UPDATE_MATERIAL}`,
    API_URL_DELETE_MATERIAL_BY_ID: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.DELETE_MATERIAL_BY_ID}`,

    API_URL_GET_ALL_STAFFPAYMENTS: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.GET_ALL_STAFFPAYMENTS}`,
    API_URL_GET_STAFFPAYMENT_BY_ID: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.GET_STAFFPAYMENT_BY_ID}`,
    API_URL_CREATE_STAFFPAYMENT: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.CREATE_STAFFPAYMENT}`,
    API_URL_UPDATE_STAFFPAYMENT: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.UPDATE_STAFFPAYMENT}`,
    API_URL_DELETE_STAFFPAYMENT_BY_ID: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.DELETE_STAFFPAYMENT_BY_ID}`,

    API_URL_GET_ALL_TOOLS: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.GET_ALL_TOOLS}`,
    API_URL_GET_TOOL_BY_ID: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.GET_TOOL_BY_ID}`,
    API_URL_CREATE_TOOL: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.CREATE_TOOL}`,
    API_URL_UPDATE_TOOL: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.UPDATE_TOOL}`,
    API_URL_DELETE_TOOL_BY_ID: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.DELETE_TOOL_BY_ID}`,

    API_URL_GET_ALL_WOODS: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.GET_ALL_WOODS}`,
    API_URL_GET_WOOD_BY_ID: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.GET_WOOD_BY_ID}`,
    API_URL_CREATE_WOOD: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.CREATE_WOOD}`,
    API_URL_UPDATE_WOOD: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.UPDATE_WOOD}`,
    API_URL_DELETE_WOOD_BY_ID: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.DELETE_WOOD_BY_ID}`,

    API_URL_GET_ALL_COMPLAINTS: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.GET_ALL_COMPLAINTS}`,
    API_URL_GET_COMPLAINT_BY_ID: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.GET_COMPLAINT_BY_ID}`,
    API_URL_CREATE_COMPLAINT: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.CREATE_COMPLAINT}`,
    API_URL_UPDATE_COMPLAINT: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.UPDATE_COMPLAINT}`,
    API_URL_DELETE_COMPLAINT_BY_ID: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.DELETE_COMPLAINT_BY_ID}`
};

const Constants = process.env.NODE_ENV === 'development' ? development : production

export default Constants