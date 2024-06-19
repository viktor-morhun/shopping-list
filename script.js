document.addEventListener("DOMContentLoaded", () => {
  const checkboxes = document.querySelectorAll(".list__checkbox");
  
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      const listItem = checkbox.closest(".list__item");
      listItem.classList.toggle("checked", checkbox.checked);
      
      updateListItems();
    });
  });

  function updateListItems() {
    const listItems = document.querySelectorAll(".list__item");
    let seriesStart = null;

    listItems.forEach((item, index) => {
      item.classList.remove("single", "series-first", "series-middle", "series-last");

      const isChecked = item.querySelector(".list__checkbox").checked;

      if (isChecked) {
        if (seriesStart === null) {
          seriesStart = index;
        }

        const isLastInSeries = (index === listItems.length - 1) || 
                                !listItems[index + 1].querySelector(".list__checkbox").checked;

        if (isLastInSeries) {
          if (seriesStart === index) {
            item.classList.add("single");
          } else {
            listItems[seriesStart].classList.add("series-first");
            item.classList.add("series-last");

            for (let i = seriesStart + 1; i < index; i++) {
              listItems[i].classList.add("series-middle");
            }
          }

          seriesStart = null;
        }
      } else {
        seriesStart = null;
      }
    });
  }
});
