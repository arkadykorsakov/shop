const toCurrency = (price) => {
  return new Intl.NumberFormat("ru-RU", {
    currency: "rub",
    style: "currency",
  }).format(price);
};

document.querySelectorAll(".price").forEach((node) => {
  node.textContent = toCurrency(node.textContent);
});

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll("select");
  var instances = M.FormSelect.init(elems);
});

document.addEventListener("click", async (e) => {
  const id = e.target?.dataset?.idCategory || null;
  if (id) {
    await fetch(`/category/${id}/delete`, {
      method: "DELETE",
    }).then(() => {
      window.location.href = "/category";
    });
  }
});

document.addEventListener("click", async (e) => {
  const id = e.target?.dataset?.idProduct || null;
  if (id) {
    await fetch(`/products/${id}/delete`, {
      method: "DELETE",
    }).then(() => {
      window.location.href = "/products";
    });
  }
});

document.addEventListener("click", async (e) => {
  const id = e.target?.dataset?.idRemoveOne || null;
  if (id) {
    await fetch(`/cart/${id}/deleteOne`, {
      method: "DELETE",
    }).then(() => {
      window.location.href = "/cart";
    });
  }
});

document.addEventListener("click", async (e) => {
  const id = e.target?.dataset?.idRemoveAll || null;
  if (id) {
    await fetch(`/cart/${id}/deleteAll`, {
      method: "DELETE",
    }).then(() => {
      window.location.href = "/cart";
    });
  }
});

document.addEventListener("click", async (e) => {
  const deleteUser = e.target?.dataset?.deleteUser || null;
  if (deleteUser) {
    await fetch(`/office/`, {
      method: "DELETE",
    }).then(() => {
      window.location.href = "/login";
    });
  }
});
