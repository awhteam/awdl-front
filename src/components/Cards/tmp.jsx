import * as React from "react";

import "./style.scss";

import { Menu, MenuItem, Typography, Button } from "@mui/material";

export const MALCard = () => {
  return (
    <>
    <div class="seasonal-anime js-seasonal-anime" data-genre="4,36,23,27"><div>
    <div class="title"><a href="https://myanimelist.net/anime/48926/Komi-san_wa_Comyushou_desu/video" class="icon-watch-pv fl-r ga-click" title="Watch Promotional Video">Watch Promotional Video</a><div class="title-text">
        <h2 class="h2_anime_title"><a href="https://myanimelist.net/anime/48926/Komi-san_wa_Comyushou_desu" class="link-title">Komi-san wa, Comyushou desu.</a></h2>
      </div>
    </div>

    <div class="prodsrc">
      <span class="producer"><a href="/anime/producer/28/OLM" title="OLM">OLM</a></span>
      <div class="eps">
                <a href="https://myanimelist.net/anime/48926/Komi-san_wa_Comyushou_desu/episode"><span>? eps</span>
        </a>
      </div>

      <span class="source">Manga</span>

      <a href="https://myanimelist.net/ownlist/anime/add?selected_series_id=48926&amp;hideLayout=1" title="Quick add anime to my list" class="Lightbox_AddEdit button_add btn-anime-watch-status js-anime-watch-status notinmylist">add</a>
    </div>

    <div class="genres js-genre" id="48926">
      <div class="genres-inner js-genre-inner"><span class="genre">
            <a href="/anime/genre/4/Comedy" title="Comedy">Comedy</a>
          </span><span class="genre">
            <a href="/anime/genre/36/Slice_of_Life" title="Slice of Life">Slice of Life</a>
          </span></div>
    </div>
  </div>

  <div class="image"><a href="https://myanimelist.net/anime/48926/Komi-san_wa_Comyushou_desu">
    <img src="https://cdn.myanimelist.net/images/anime/1899/117237.webp" width="167" alt="Komi-san wa, Comyushou desu." srcset="https://cdn.myanimelist.net/images/anime/1899/117237.webp 1x, https://cdn.myanimelist.net/images/anime/1899/117237.webp 2x"/></a>    <a href="https://myanimelist.net/anime/48926/Komi-san_wa_Comyushou_desu" class="link-image">Komi-san wa, Comyushou desu.</a>
  </div>

  <div class="synopsis js-synopsis">
    <span class="preline">Hitohito Tadano is an ordinary boy who heads into his first day of high school with a clear plan: to avoid trouble and do his best to blend in with others. Unfortunately, he fails right away when he takes the seat beside the school's  madonna—Shouko Komi. His peers now recognize him as someone to eliminate for a chance to sit next to the most beautiful girl in class.

Gorgeous and graceful with long, dark hair, Komi is universally adored and immensely popular despite her mysterious persona. However, unbeknownst to everyone, she has crippling anxiety and a communication disorder which prevents her from wholeheartedly socializing with her classmates.

When left alone in the classroom, a chain of events forces Komi to interact with Tadano through writing on the blackboard, as if in a one-way conversation. Being the first person to realize she cannot communicate properly, Tadano picks up the chalk and begins to write as well. He eventually discovers that Komi's goal is to make one hundred friends during her time in high school. To this end, he decides to lend her a helping hand, thus also becoming her first-ever friend.

[Written by MAL Rewrite]</span>
          <p class="mb4 mt8">
        <span class="fw-b">Theme:</span><br/><a href="/anime/genre/23/School" title="School">School</a></p>
            <p class="mb4 mt8">
      <span class="fw-b">Demographic:</span><br/><a href="/anime/genre/27/Shounen" title="Shounen">Shounen</a></p>
          </div>
  
  <div class="information">
    <div class="info">
      TV -
      <span class="remain-time">
                  Oct 7, 2021, 00:00 (JST)              </span>
    </div>
    <div class="scormem">
      <span class="member fl-r" title="Members">
        <i class="fa-solid fa-user mr4"></i>399,169
      </span>
      <span class="score score-label score-8" title="Score">
        <i class="fa-regular fa-star mr4"></i>8.29
      </span>
    </div>
  </div>
</div>
    </>
  );
};

export const AllCards = () => {
  return (
    <>
    <MALCard/>
    </>
  );
};
