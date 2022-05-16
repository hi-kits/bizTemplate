/**
 * 拖拽选择组件
 * @class APPDragSelectComponent
 * @version 0.0.1
 * @author by fico on 2021/04/06
 * @Copyright © 2021 海尔优家智能科技（北京）有限公司. All rights reserved.
 * @description
 */

import { Component, Input, EventEmitter, Output, OnInit, ViewChild, TemplateRef, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-drag-select',
  templateUrl: './app.dragSelect.html',
  styleUrls: ['./app.dragSelect.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})

export class APPDragSelectComponent  implements OnInit {
  /* ---------- 显示属性 ---------- */

  /**
   * 初始化
   */
  ngOnInit(): void {


  }
  // 计算宽度
  // drawCells(table, config, split = false) {
  //   const colLabelTd = '<td class="col-label"></td>';
  //   const colStartTd = '<td class="col-spacer border-right"></td>';
  //   const colSpacerTd = '<td class="col-spacer"></td>';
  //   let colLabelTds = colLabelTd;
  //   let spacerTds = colSpacerTd;
  //   let colSelectTds = colStartTd;
  //   for (let c = 0; c < config.colLabels.length; c++) {
  //     spacerTds += colLabelTd;
  //     colSelectTds += `<td class="selectable-col" data-col="${c}" data-rows="${
  //       config.rowLabels.length
  //     }"></td>`;
  //     colLabelTds += `<td class="col-label">${config.colLabels[c]}</td>`;
  //   }

  //   if (split) {
  //     colLabelTds += colLabelTds;
  //   }
  //   $(table).append(`<tr>${colLabelTds}</tr>`);


  //   let lastLabel = null;
  //   let lastSplitLabel = null;
  //   function makeLabel(r, isSplit) {
  //     const label = config.rowLabels[r];
  //     let labelClass = '';
  //     if (isSplit) {
  //       if (label !== lastSplitLabel) {
  //         labelClass = 'first-label-instance';
  //       }
  //       lastSplitLabel = label;
  //     }
  //     else {
  //       if (label !== lastLabel) {
  //         labelClass = 'first-label-instance';
  //       }
  //       lastLabel = label;
  //     }
  //     return `<td class="row-label ${label} ${labelClass}">${label}</td>`;
  //   }
  //   let lastCellDatas = ['1'];
  //   let lastSplitCellDatas = ['1'];
  //   let odd = true;
  //   let splitOdd = true;

  //   function appendCols(r, isSplit) {
  //     let tds = '';
  //     for (let c = 0; c < config.colLabels.length; c++) {
  //       const cellText = config.cellData ? config.cellData[r][c] : '';
  //       let toggleClass;
  //       if (isSplit) {
  //         if (lastSplitCellDatas.includes(cellText)) {
  //           lastSplitCellDatas = [];
  //           splitOdd = !splitOdd;
  //         }
  //         lastSplitCellDatas.push(cellText);
  //         toggleClass = splitOdd ? 'odd' : 'even';
  //       }
  //       else {
  //         if (lastCellDatas.includes(cellText)) {
  //           lastCellDatas = [];
  //           odd = !odd;
  //         }
  //         lastCellDatas.push(cellText);
  //         toggleClass = odd ? 'odd' : 'even';
  //       }

  //       tds += `<td data-row="${r}" data-col="${c}" class="selectable-cell ${cellText} ${toggleClass}">${cellText}</td>`;
  //     }
  //     return tds;
  //   }

  //   const max = (split) ? config.rowLabels.length / 2 : config.rowLabels.length;

  //   for (let r = 0; r < max; r++) {
  //     let tds = '';

  //     tds += appendCols(r, false);
  //     if (split) {
  //       tds += colStartTd;
  //       tds += appendCols(r + max, true);
  //     }
  //     else {
  //       tds += '<td class="row-spacer"></td>';
  //       tds += `<td class="selectable-row" data-row="${r}" data-cols="${config.colLabels.length}"></td>`;
  //     }


  //     tds = makeLabel(r, false) + tds;
  //     if (split) {
  //       tds += makeLabel(r + max, true);
  //     }

  //     const tr = `
  //       <tr class="selectable-tr">
  //         ${tds}
  //       </tr>`;
  //     $(table).append(tr);
  //   }


  //   if (split) {
  //     colSelectTds += colSelectTds;
  //   }
  //   else {
  //     $(table).append(`<tr>${spacerTds}</tr>`);
  //     colSelectTds = `${colSelectTds}${colStartTd}<td class="clear-all"></td>`;
  //     $(table).append(`<tr>${colSelectTds}</tr>`);
  //   }
  // }

}



// const CALENDAR_WEEKS = 54;

// $().ready(() => {
//   initMoment();

//   drawCells('table.date-picker', buildCalendarData(), true);
//   init('table.date-picker', true);

//   drawCells('table.daypart-picker', buildDaypartsData(), false);
//   init('table.daypart-picker', false);
// });

// function initMoment() {
//   moment.locale('us-en', { week: { dow: 1 } });
// }

// function daysOfWeek() {
//   const days = [];
//   for (let i = 0; i < 7; i++) {
//     days.push(
//       moment()
//         .startOf('week')
//         .add(i, 'days')
//         .format('dd')
//     );
//   }
//   return days;
// }

// function datesOfWeek(week) {
//   const dates = [];
//   for (let i = 0; i < 7; i++) {
//     dates.push(
//       moment(week)
//         .add(i, 'days')
//         .format('D')
//     );
//   }
//   return dates;
// }

// function hoursOfDay() {
//   const hours = [];
//   for (let i = 0; i < 24; i++) {
//     hours.push(
//       moment()
//         .startOf('day')
//         .add(i, 'hours')
//         .format('h a')
//     );
//   }
//   return hours;
// }

// function buildDaypartsData() {
//   return {
//     colLabels: daysOfWeek(),
//     rowLabels: hoursOfDay(),
//     cellData: null
//   };
// }

// function buildCalendarData() {
//   const weeks = [];
//   const dates = [];
//   for (let i = 0; i < CALENDAR_WEEKS; i++) {
//     const week = moment()
//       .startOf('week')
//       .add(i, 'weeks');
//     dates.push(datesOfWeek(week));
//     weeks.push(week.endOf('week').format('MMM'));
//   }
//   return {
//     colLabels: daysOfWeek(),
//     rowLabels: weeks,
//     cellData: dates
//   };
// }

// function drawCells(table, config, split = false) {
//   const colLabelTd = '<td class="col-label"></td>';
//   const colStartTd = '<td class="col-spacer border-right"></td>';
//   const colSpacerTd = '<td class="col-spacer"></td>';
//   let colLabelTds = colLabelTd;
//   let spacerTds = colSpacerTd;
//   let colSelectTds = colStartTd;
//   for (let c = 0; c < config.colLabels.length; c++) {
//     spacerTds += colLabelTd;
//     colSelectTds += `<td class="selectable-col" data-col="${c}" data-rows="${
//       config.rowLabels.length
//     }"></td>`;
//     colLabelTds += `<td class="col-label">${config.colLabels[c]}</td>`;
//   }

//   if (split) {
//     colLabelTds += colLabelTds;
//   }
//   $(table).append(`<tr>${colLabelTds}</tr>`);


//   let lastLabel = null;
//   let lastSplitLabel = null;
//   function makeLabel(r, isSplit) {
//     const label = config.rowLabels[r];
//     let labelClass = '';
//     if (isSplit) {
//       if (label !== lastSplitLabel) {
//         labelClass = 'first-label-instance';
//       }
//       lastSplitLabel = label;
//     }
//     else {
//       if (label !== lastLabel) {
//         labelClass = 'first-label-instance';
//       }
//       lastLabel = label;
//     }
//     return `<td class="row-label ${label} ${labelClass}">${label}</td>`;
//   }
//   let lastCellDatas = ['1'];
//   let lastSplitCellDatas = ['1'];
//   let odd = true;
//   let splitOdd = true;

//   function appendCols(r, isSplit) {
//     let tds = '';
//     for (let c = 0; c < config.colLabels.length; c++) {
//       const cellText = config.cellData ? config.cellData[r][c] : '';
//       let toggleClass;
//       if (isSplit) {
//         if (lastSplitCellDatas.includes(cellText)) {
//           lastSplitCellDatas = [];
//           splitOdd = !splitOdd;
//         }
//         lastSplitCellDatas.push(cellText);
//         toggleClass = splitOdd ? 'odd' : 'even';
//       }
//       else {
//         if (lastCellDatas.includes(cellText)) {
//           lastCellDatas = [];
//           odd = !odd;
//         }
//         lastCellDatas.push(cellText);
//         toggleClass = odd ? 'odd' : 'even';
//       }

//       tds += `<td data-row="${r}" data-col="${c}" class="selectable-cell ${cellText} ${toggleClass}">${cellText}</td>`;
//     }
//     return tds;
//   }

//   const max = (split) ? config.rowLabels.length / 2 : config.rowLabels.length;

//   for (let r = 0; r < max; r++) {
//     let tds = '';

//     tds += appendCols(r, false);
//     if (split) {
//       tds += colStartTd;
//       tds += appendCols(r + max, true);
//     }
//     else {
//       tds += '<td class="row-spacer"></td>';
//       tds += `<td class="selectable-row" data-row="${r}" data-cols="${config.colLabels.length}"></td>`;
//     }


//     tds = makeLabel(r, false) + tds;
//     if (split) {
//       tds += makeLabel(r + max, true);
//     }

//     const tr = `
//       <tr class="selectable-tr">
//         ${tds}
//       </tr>`;
//     $(table).append(tr);
//   }


//   if (split) {
//     colSelectTds += colSelectTds;
//   }
//   else {
//     $(table).append(`<tr>${spacerTds}</tr>`);
//     colSelectTds = `${colSelectTds}${colStartTd}<td class="clear-all"></td>`;
//     $(table).append(`<tr>${colSelectTds}</tr>`);
//   }
// }

// function init(table, isCalendar) {
//   const cellClass = 'td.selectable-cell';
//   const cellSelector = `${table} ${cellClass}`;
//   const rowSelector = `${table} tr.selectable-tr`;
//   const colSelectSelector = `${table} td.selectable-col`;
//   const rowSelectSelector = `${table} td.selectable-row`;
//   const clearAllSelectSelector = `${table} td.clear-all`;
//   let isDown = false;
//   let invertSelection = false;
//   let dragCols = [];
//   let dragRows = [];

//   const $doc = $(document);
//   $doc.on('mousedown', function(event) {
//     isDown = true;
//     invertSelection = event.altKey;
//     const $target = $(event.target);
//     let namespace = null;
//     let selector = null;
//     let selectRow = false;
//     let selectCol = false;
//     let calendarMode = isCalendar;

//     if ($target.is(cellSelector)) {
//       selector = cellSelector;
//       namespace = 'cell-select';
//       calendarMode = isCalendar;
//     } else if ($target.is(rowSelectSelector)) {
//       selector = rowSelectSelector;
//       namespace = 'row-select';
//       selectRow = true;
//       calendarMode = isCalendar;
//     } else if ($target.is(colSelectSelector)) {
//       selector = colSelectSelector;
//       namespace = 'col-select';
//       selectCol = true;
//       calendarMode = false;
//     }

//     if (namespace) {
//       clearCoords();
//       updateCoords(event, selectRow, selectCol);
//       selectCells(calendarMode);
//       $doc.on(`mousemove.${namespace}`, function(event) {
//         if (isDown && $target.is(selector)) {
//           updateCoords(event, selectRow, selectCol);
//           selectCells(calendarMode);
//         }
//       });
//       $doc.one(`mouseup.${namespace}`, function(event) {
//         isDown = false;
//         if ($target.is(selector)) {
//           updateCoords(event, selectRow, selectCol);
//           selectCells(calendarMode);
//         } else {
//           clearCoords();
//         }
//         clearPending();
//         $doc.off(`mousemove.${namespace}`);
//       });
//     } else if ($target.is(clearAllSelectSelector)) {
//       clearSelected();
//     }
//   });

//   function updateCoords(event, selectRow, selectCol) {
//     const $cell = $(event.target);
//     const row = $cell.data('row');
//     const col = $cell.data('col');
//     if (selectRow) {
//       dragCols = [0, $cell.data('cols')];
//     } else {
//       if (dragCols.length < 2) {
//         dragCols.push(col);
//       } else {
//         dragCols[1] = col;
//       }
//     }

//     if (selectCol) {
//       dragRows = [0, $cell.data('rows')];
//     } else {
//       if (dragRows.length < 2) {
//         dragRows.push(row);
//       } else {
//         dragRows[1] = row;
//       }
//     }
//     // console.log("dragCols", dragCols);
//     // console.log("dragRows", dragRows);
//   }

//   function clearCoords() {
//     dragCols = [];
//     dragRows = [];
//   }

//   function selectCells(calendarMode) {
//     $(cellSelector).each(function(i) {
//       const $cell = $(this);
//       if (isDown) {
//         $cell.removeClass('is-pending');
//       }
//       const row = $cell.data('row');
//       const col = $cell.data('col');
//       if (

//         /* daypart select */
//         (
//           calendarMode === false &&
//           col >= Math.min(...dragCols) &&
//           col <= Math.max(...dragCols) &&
//           row >= Math.min(...dragRows) &&
//           row <= Math.max(...dragRows)
//         ) ||

//         /* calendar select */
//         (
//           calendarMode === true &&
//           (
//           /* select all on middle rows */
//             (
//               row > Math.min(...dragRows) &&
//               row < Math.max(...dragRows)
//             ) ||

//             /* downward drag, first row, allow partial */
//             (
//               row === dragRows[0] &&
//               row !== dragRows[1] &&
//               dragRows[1] > dragRows[0] &&
//               col >= dragCols[0]
//             ) ||

//             /* downward drag, last row, allow partial */
//             (
//               row !== dragRows[0] &&
//               row === dragRows[1] &&
//               dragRows[1] > dragRows[0] &&
//               col <= dragCols[1]
//             ) ||

//             /* upward drag, first row, allow partial */
//             (
//               row === dragRows[0] &&
//               row !== dragRows[1] &&
//               dragRows[1] < dragRows[0] &&
//               col <= dragCols[0]
//             ) ||

//             /* upward drag, last row, allow partial */
//             (
//               row !== dragRows[0] &&
//               row === dragRows[1] &&
//               dragRows[1] < dragRows[0] &&
//               col >= dragCols[1]
//             ) ||

//             /* single row, allow partial */
//             (
//               row === dragRows[0] &&
//               row === dragRows[1] &&
//               col <= Math.max(...dragCols) &&
//               col >= Math.min(...dragCols)
//             )
//           )
//         )
//       ) {
//         // console.log('el', i);
//         selectCell($cell);
//       }
//     });
//   }

//   function clearPending() {
//     $(cellSelector).removeClass('is-pending');
//   }

//   function clearSelected() {
//     $(cellSelector).removeClass('is-selected');
//   }

//   function selectCell($cell) {
//     if (isDown) {
//       $cell.addClass('is-pending');
//     } else {
//       if (invertSelection) {
//         $cell.removeClass('is-selected');
//       } else {
//         $cell.addClass('is-selected');
//       }
//     }
//   }
// }
