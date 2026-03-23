import React from "react";

function EditNotes() {
  return (
    <>
      <nav class="bg-slate-800 py-2">
        <div class="container mx-auto flex items-center justify-between">
          <a href="#" class="text-2xl font-bold text-white">
            dotMD
          </a>

          <a
            href="#"
            class="text-md text-slate-800 bg-white rounded inline-block px-3 py-1 hover:bg-slate-200"
          >
            Create
          </a>
        </div>
      </nav>

      <div class="container mx-auto mt-6 flex">
        <div class="w-1/2 md:w-2/3 mr-4 text-md">
          <input
            type="text"
            class="w-full border px-3 py-2 rounded border-slate-400"
            placeholder="Note title"
            value="Note 1"
          />
          <hr class="my-4" />
          <textarea class="w-full h-96 border px-3 py-2 rounded border-slate-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            bibendum molestie diam ut ullamcorper. Nunc nulla arcu, luctus sed
            lorem vitae, tincidunt dapibus ex. Pellentesque habitant morbi
            tristique senectus et netus et malesuada fames ac turpis egestas.
            Etiam vitae dolor bibendum, tempor nibh id, placerat odio. Integer
            vel laoreet quam, eu dictum nulla. Vivamus ligula quam, tincidunt eu
            turpis eu, lobortis hendrerit neque. Vestibulum porta laoreet odio
            vitae molestie. Fusce varius efficitur turpis eu mattis. Nam libero
            mauris, consectetur vel nibh eget, rutrum scelerisque eros.
          </textarea>
        </div>
        <div class="w-1/2 md:w-2/3 px-4 text-md">
          <h2 class="text-lg font-semibold py-2">Note 1</h2>
          <hr class="my-4" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            bibendum molestie diam ut ullamcorper. Nunc nulla arcu, luctus sed
            lorem vitae, tincidunt dapibus ex. Pellentesque habitant morbi
            tristique senectus et netus et malesuada fames ac turpis egestas.
          </p>
          <p>
            Etiam vitae dolor bibendum, tempor nibh id, placerat odio. Integer
            vel laoreet quam, eu dictum nulla. Vivamus ligula quam, tincidunt eu
            turpis eu, lobortis hendrerit neque. Vestibulum porta laoreet odio
            vitae molestie. Fusce varius efficitur turpis eu mattis. Nam libero
            mauris, consectetur vel nibh eget, rutrum scelerisque eros.
          </p>
        </div>
      </div>
    </>
  );
}
export default EditNotes;
