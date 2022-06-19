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
    DELETE_BRANCH_BY_ID: 'delete-branch-by-id'
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
    API_URL_DELETE_BRANCH_BY_ID: `${API_BASE_URL_DEVELOPMENT}/${ENDPOINT.DELETE_BRANCH_BY_ID}`
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
    API_URL_DELETE_BRANCH_BY_ID: `${API_BASE_URL_PRODUCTION}/${ENDPOINT.DELETE_BRANCH_BY_ID}`
};

const Constants = process.env.NODE_ENV === 'development' ? development : production

export default Constants