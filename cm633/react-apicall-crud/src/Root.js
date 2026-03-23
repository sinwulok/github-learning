import React from "react";
import { Link } from "react-router-dom";

function Root() {
  return (
    <>
      <nav class="bg-slate-800 py-2">
        <div class="container mx-auto flex items-center justify-between">
          <Link to={"#"} class="text-2xl font-bold text-white">
            dotMD
          </Link>

          <Link to={"#"} class="text-md text-white">
            Create
          </Link>
        </div>
      </nav>

      <div class="container mx-auto mt-6 flex">
        <div class="w-1/2 md:w-1/3 pr-2">
          <ul class="rounded-md border text-md text-slate-700">
            <li class="cursor-pointer border-b bg-slate-200 px-4 py-2">
              <strong>Note 1</strong>
              <p class="leading text-xs text-slate-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                vel sed ipsum
              </p>
            </li>
            <li class="cursor-pointer border-b px-4 py-2 hover:bg-slate-200">
              <strong>Note 2</strong>
              <p class="leading text-xs text-slate-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                vel sed ipsum
              </p>
            </li>
            <li class="cursor-pointer border-b px-4 py-2 hover:bg-slate-200">
              <strong>Note 3</strong>
              <p class="leading text-xs text-slate-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                vel sed ipsum
              </p>
            </li>
          </ul>
        </div>

        <div class="w-1/2 md:w-2/3 px-4 text-md">
          <h2 class="text-lg font-semibold">Note 1</h2>
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
          <div class="mt-4 text-sm">
            <Link to={"#"} class="text-slate-400">
              [Edit]
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Root;
