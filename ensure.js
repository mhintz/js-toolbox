var acquire = reqire('lib/acquire');

var slice = Array.prototype.slice;
var toArray = function(x) { return slice.call(x); };
function getKey(el) { return el.tagName + '.' + el.getAttribute('class').replace(' ', '.'); }

function findInContents(childKey, contents) {
  for (var i = 0, l = contents.length; i < l; ++i) {
    if (contents[i].elKey === childKey) {
      return i;
    }
  }
  // Don't return -1. The key should exist.
}

function ensure(container, contents) {
  // container should be a d3 selection, contents is either an array containing data structures
  // representing the expected contents of the selection, or a string representing the final text/html
  // of the selection.
  // Returns the container selection, with contents properly ensured and sorted, which is necessary for
  // the recursion.
  if (typeof contents === 'undefined') {
    // do nothing, the element exists and it has no contents...
  } else if (typeof contents === 'string') {
    container.html(contents);
  } else if (typeof contents === 'object') { // assume array
    var containerNode = container.node();

    var existingContents = toArray(containerNode.children).reduce(function(m, element) {
      var key = getKey(element);
      m[key] = {
        key: key,
        elSelection: d3.select(element)
      };
      return m;
    }, {});

    var eventualContents = [];

    contents.forEach(function(listing) {
      var key = listing.elKey;
      var existingEl = existingContents[key];
      if (existingEl) {
        // Ensures the contents of the existing element match the expected contents.
        eventualContents.push(ensure(existingEl.elSelection, listing.elContents));
        delete existingContents[key];
      } else {
        var splitKey = key.split('.');
        var elType = splitKey[0];
        var elClass = splitKey.slice(1).join(' ');
        // Creates the element and ensures its contents.
        eventualContents.push(ensure(acquire(container, elClass, elType), listing.elContents));
      }
    });

    // These shouldn't be in the DOM anymore
    for (var elKey in existingContents) {
      // Removes the existing element from the DOM
      existingContents[elKey].elSelection.remove();
    }

    // Sort the children according to their appearance in the contents object
    toArray(containerNode.children).sort(function(childA, childB) {
      return findInContents(childA, contents) - findInContents(childB, contents);
    })
    // and append them in that order to the container's node
    .forEach(function(child) {
      containerNode.appendChild(child);
    });
  }

  return container;
};

module.exports = ensure;

var contentsSetOne = [
  {
    elKey: 'div.classA',
    elContents: []
  },
  {
    elKey: 'div.classB',
    elContents: [
      {
        elKey: 'div.classC',
        elContents: [
          {
            elKey: 'div.classD',
            elContents: []
          },
          {
            elKey: 'span.classF',
            elContents: 'span text content'
          },
          {
            elKey: 'div.classG',
            elContents: 'div text content'
          }
        ],
      },
      {
        elKey: 'svg.classE',
        elContents: []
      }
    ]
  },
  {
    elKey: 'div.classH',
    elContents: 'lower div contents'
  }
];

var contentsSetTwo = [
  {
    elKey: 'div.classA',
    elContents: []
  },
  {
    elKey: 'div.classB',
    elContents: [
      {
        elKey: 'div.classC',
        elContents: [
          {
            elKey: 'div.classD',
            elContents: []
          },
          {
            elKey: 'span.classF',
            elContents: 'span text content'
          },
          {
            elKey: 'div.classG',
            elContents: 'div text content'
          }
        ],
      },
      {
        elKey: 'svg.classE',
        elContents: [
          {
            elKey: 'g.classI',
            elContents: []
          },
          {
            elKey: 'rect.classJ',
            elContents: []
          }
        ]
      }
    ]
  },
  {
    elKey: 'h1.classH',
    elContents: 'now it\'s an h1'
  }
];

module.exports.testEnsureOne = function(selection) {
  return ensure(selection, contentsSetOne);
}

module.exports.testEnsureTwo = function(selection) {
  return ensure(selection, contentsSetTwo);
}
