const MAX_NUM_OF_CUBES_SHOWN = 4;

const findCubeListHeight = currCatRef => {
  let elementArray = Object.values(
    currCatRef.nextElementSibling.elements
  ).filter(el => el.nodeName === "INPUT");
  if (elementArray.length >= MAX_NUM_OF_CUBES_SHOWN) {
    elementArray = elementArray.slice(0, MAX_NUM_OF_CUBES_SHOWN);
  }
  const cubeListHeight = elementArray.reduce((accu, curr) => {
    return accu + curr.parentNode.clientHeight;
  }, 0);
  currCatRef.nextElementSibling.style.height = `${cubeListHeight}px`;
  currCatRef.nextElementSibling.style.maxHeight = `${cubeListHeight}px`;
};

const openCategory = currCatRef => {
  if (!currCatRef.className.split(" ").includes("open")) {
    currCatRef.classList.add("open");
    currCatRef.parentElement.style.zIndex = "1";
  }
};

const closeCategories = (currentCategory, currCatRef, allCategoryRefs) => {
  if (currentCategory === null) {
    allCategoryRefs.forEach(ref => {
      ref.classList.remove("open");
      ref.parentElement.style.zIndex = "0";
      ref.nextElementSibling.style.maxHeight = "0px";
    });
  } else {
    allCategoryRefs.forEach(ref => {
      if (
        ref.id !== currCatRef?.id &&
        ref.className.split(" ").includes("open")
      ) {
        ref.classList.remove("open");
        ref.parentElement.style.zIndex = "0";
        ref.nextElementSibling.style.maxHeight = "0px";
      }
    });
  }
};

export {
  findCubeListHeight,
  openCategory,
  closeCategories,
  MAX_NUM_OF_CUBES_SHOWN,
};
