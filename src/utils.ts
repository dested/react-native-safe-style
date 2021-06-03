export const fromEntries =
  Object.fromEntries ||
  function fromEntries<T>(iterable: Iterable<readonly [PropertyKey, T]>): {[k: string]: T} {
    var entries = Array.isArray(iterable)
      ? createEntries(iterable)
      : 'entries' in iterable
      ? (iterable as any).entries()
      : iterable;
    var object = {};
    var entry;
    while ((entry = entries.next()) && !entry.done) {
      var pair = entry.value;
      Object.defineProperty(object, pair[0], {
        configurable: true,
        enumerable: true,
        writable: true,
        value: pair[1],
      });
    }
    return object;
  };

function createEntries<T>(array: T[]) {
  var i = -1;
  return {
    next: function () {
      var done = array.length <= ++i;
      return {
        done: done,
        value: done ? void 0 : array[i],
      };
    },
  };
}

export function safeKeys<T>(obj: T): Extract<keyof T, string>[] {
  return Object.keys(obj) as Extract<keyof T, string>[];
}
export function safeEntries<T>(obj: T): [keyof T, T[keyof T]][] {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
}
