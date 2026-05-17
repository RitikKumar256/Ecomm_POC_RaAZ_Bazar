export const logoutUser = (role?: string) => {

  // ADMIN
  if (role === "ROLE_ADMIN") {

    localStorage.removeItem("admin_jwt");

  }

  // SELLER
  else if (role === "ROLE_SELLER") {

    localStorage.removeItem("seller_jwt");

  }

  // CUSTOMER
  else {

    localStorage.removeItem("customer_jwt");
  }

  // REMOVE COMMON DATA
  localStorage.removeItem("role");
};