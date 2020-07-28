const CONTROLS_DATA = [
  {
    name: `new-task`,
    text: `+ ADD NEW TASK`,
  },
  {
    name: `task`,
    text: `TASKS`,
  },
  {
    name: `statistic`,
    text: `STATISTICS`,
  },
]

const TASKS_DATA = [
  {
    color: `black`,
    text: `Example task with default color.`,
    date: `23 September`,
    overdue: false,
    today: false,
    repeat: false,
    deadline: false,
    favorites: false,
    archive: true,
  },
  {
    color: `blue`,
    text: `Example task with custom color.`,
    date: `23 September`,
    overdue: false,
    today: false,
    repeat: true,
    deadline: true,
    favorites: true,
    archive: false,
  },
  {
    color: `pink`,
    text: `Example task with custom color and without date.`,
    date: ``,
    overdue: false,
    today: false,
    repeat: true,
    deadline: false,
    favorites: false,
    archive: true,
  },
]

const FILTER_DATA = [
  {
    name: `All`,
    count: TASKS_DATA.length,
  },
  {
    name: `Overdue`,
    count: TASKS_DATA.reduce((sum, task) => {
      let count = task.overdue ? 1 : 0
      return sum + count
    }, 0),
  },
  {
    name: `Today`,
    count: TASKS_DATA.reduce((sum, task) => {
      let count = task.today ? 1 : 0
      return sum + count
    }, 0),
  },
  {
    name: `Favorites`,
    count: TASKS_DATA.reduce((sum, task) => {
      let count = task.favorites ? 1 : 0
      return sum + count
    }, 0),
  },
  {
    name: `Repeating`,
    count: TASKS_DATA.reduce((sum, task) => {
      let count = task.repeat ? 1 : 0
      return sum + count
    }, 0),
  },
  {
    name: `Archive`,
    count: TASKS_DATA.reduce((sum, task) => {
      let count = task.archive ? 1 : 0
      return sum + count
    }, 0),
  },
]

const SORT_DATA = [
  {
    text: `SORT BY DEFAULT`,
    link: `#`,
  },
  {
    text: `SORT BY DATE up`,
    link: `#`,
  },
  {
    text: `SORT BY DATE down`,
    link: `#`,
  },
]

const createSiteMenuContainer = () => {
  return (
    `<section class="control__btn-wrap"></section>`
  )
}

const createSiteMenuElement = (control) => {
  const attrChecked = control.name === `task` ? `checked` : ``
  const classNewTask = control.name === `new-task` ? `control__label--new-task` : ``

  return (
    `<input
        type="radio"
        name="control"
        id="control__${control.name}"
        class="control__input visually-hidden"
        ${attrChecked}
      />
      <label for="control__${control.name}" class="control__label ${classNewTask}"
        >${control.text}</label
      >`
  )
}

const createSiteFiltersContainer = () => {
  return (
    `<section class="main__filter filter container"></section>`
  )
}

const createSiteFilterElement = (name, count) => {
  let attr = name === `All` ? `checked` : ``
  attr = count ? attr : `disabled`

  return (
    `<input
      type="radio"
      id="filter__${name.toLowerCase()}"
      class="filter__input visually-hidden"
      name="filter"
      ${attr}
    />
    <label for="filter__${name.toLowerCase()}" class="filter__label">
      ${name} <span class="filter__${name.toLowerCase()}-count">${count}</span></label
    >`
  )
}

const createSiteBoard = () => {
  return (
    `<section class="board container"></section>`
  )
}

const createSiteSortingContainer = () => {
  return (
    `<div class="board__filter-list"></div>`
  )
}

const createSiteSortingElement = (text, link) => {
  return (
    `<a href="${link}" class="board__filter">${text}</a>`
  )
}

const createSiteTasksContainer = () => {
  return (
    `<div class="board__tasks"></div>`
  )
}

const createSiteTask = (task) => {
  const classRepeat = task.repeat ? `card--repeat` : ``
  const classDeadline = task.deadline ? `card--deadline` : ``

  const createCardDates = () => {
    const template = task.date ?
      `<div class="card__dates">
        <div class="card__date-deadline">
          <p class="card__input-deadline-wrap">
            <span class="card__date">${task.date}</span>
          </p>
        </div>
      </div>`
    : ``

    return template
  }

  return (
    `<article class="card card--${task.color} ${classRepeat} ${classDeadline}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn card__btn--archive">
              archive
            </button>
            <button
              type="button"
              class="card__btn card__btn--favorites"
            >
              favorites
            </button>
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <p class="card__text">${task.text}</p>
          </div>

          <div class="card__settings">
            <div class="card__details">
              ${createCardDates()}
            </div>
          </div>
        </div>
      </div>
    </article>`
  )
}

const createSiteNewTaskElement = () => {
  return (
    `<article class="card card--edit card--black">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__color-bar">
            <svg width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >This is example of new task. You can set date and chose repeating days and color.</textarea>
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">no</span>
                </button>

                <fieldset class="card__date-deadline" disabled>
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__date"
                      type="text"
                      placeholder="23 September"
                      name="date"
                    />
                  </label>
                </fieldset>

                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">no</span>
                </button>

                <fieldset class="card__repeat-days" disabled>
                  <div class="card__repeat-days-inner">
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-mo-1"
                      name="repeat"
                      value="mo"
                    />
                    <label class="card__repeat-day" for="repeat-mo-1"
                      >mo</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-tu-1"
                      name="repeat"
                      value="tu"
                      checked
                    />
                    <label class="card__repeat-day" for="repeat-tu-1"
                      >tu</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-we-1"
                      name="repeat"
                      value="we"
                    />
                    <label class="card__repeat-day" for="repeat-we-1"
                      >we</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-th-1"
                      name="repeat"
                      value="th"
                    />
                    <label class="card__repeat-day" for="repeat-th-1"
                      >th</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-fr-1"
                      name="repeat"
                      value="fr"
                      checked
                    />
                    <label class="card__repeat-day" for="repeat-fr-1"
                      >fr</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      name="repeat"
                      value="sa"
                      id="repeat-sa-1"
                    />
                    <label class="card__repeat-day" for="repeat-sa-1"
                      >sa</label
                    >
                    <input
                      class="visually-hidden card__repeat-day-input"
                      type="checkbox"
                      id="repeat-su-1"
                      name="repeat"
                      value="su"
                      checked
                    />
                    <label class="card__repeat-day" for="repeat-su-1"
                      >su</label
                    >
                  </div>
                </fieldset>
              </div>
            </div>

            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                <input
                  type="radio"
                  id="color-black-1"
                  class="card__color-input card__color-input--black visually-hidden"
                  name="color"
                  value="black"
                  checked
                />
                <label
                  for="color-black-1"
                  class="card__color card__color--black"
                  >black</label
                >
                <input
                  type="radio"
                  id="color-yellow-1"
                  class="card__color-input card__color-input--yellow visually-hidden"
                  name="color"
                  value="yellow"
                />
                <label
                  for="color-yellow-1"
                  class="card__color card__color--yellow"
                  >yellow</label
                >
                <input
                  type="radio"
                  id="color-blue-1"
                  class="card__color-input card__color-input--blue visually-hidden"
                  name="color"
                  value="blue"
                />
                <label
                  for="color-blue-1"
                  class="card__color card__color--blue"
                  >blue</label
                >
                <input
                  type="radio"
                  id="color-green-1"
                  class="card__color-input card__color-input--green visually-hidden"
                  name="color"
                  value="green"
                />
                <label
                  for="color-green-1"
                  class="card__color card__color--green"
                  >green</label
                >
                <input
                  type="radio"
                  id="color-pink-1"
                  class="card__color-input card__color-input--pink visually-hidden"
                  name="color"
                  value="pink"
                />
                <label
                  for="color-pink-1"
                  class="card__color card__color--pink"
                  >pink</label
                >
              </div>
            </div>
          </div>

          <div class="card__status-btns">
            <button class="card__save" type="submit">save</button>
            <button class="card__delete" type="button">cancel</button>
          </div>
        </div>
      </form>
    </article>`
  )
}

const createSiteButtonLoadMore = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  )
}

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template)
}

const siteMain = document.querySelector(`.main`)
const siteMainControl = siteMain.querySelector(`.main__control`)

render(siteMainControl, createSiteMenuContainer(), `beforeend`)

const siteMainControlContainer = siteMainControl.querySelector(`.control__btn-wrap`)

CONTROLS_DATA.forEach(control => {
  render(siteMainControlContainer, createSiteMenuElement(control), `beforeend`)
})

render(siteMain, createSiteFiltersContainer(), `beforeend`)

const siteFiltersContainer = siteMain.querySelector(`.main__filter`)

FILTER_DATA.forEach(filterData => {
  render(siteFiltersContainer, createSiteFilterElement(filterData.name, filterData.count), `beforeend`)
})

render(siteMain, createSiteBoard(), `beforeend`)

const siteBoard = siteMain.querySelector(`.board`)

render(siteBoard, createSiteSortingContainer(), `beforeend`)

const siteSortingContainer = siteBoard.querySelector(`.board__filter-list`)

SORT_DATA.forEach(sortingData => {
  render(siteSortingContainer, createSiteSortingElement(sortingData.text, sortingData.link), `beforeend`)
})

render(siteBoard, createSiteTasksContainer(), `beforeend`)

const siteTasksContainer = siteBoard.querySelector(`.board__tasks`)

TASKS_DATA.forEach(task => {
  render(siteTasksContainer, createSiteTask(task), `beforeend`)
})

render(siteTasksContainer, createSiteNewTaskElement(), `afterbegin`)
render(siteBoard, createSiteButtonLoadMore(), `beforeend`)

