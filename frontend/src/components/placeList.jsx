import React, { useState } from "react";
import { Flex, Box, Heading, Text, VStack } from "@chakra-ui/react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import PlaceItem from "./placeCard";

const placeList = ({}) => {
  const [places, setPlaces] = React.useState([
    {
      business_status: "OPERATIONAL",
      formatted_address:
        "No. 4號, Linsen S Rd, Zhongzheng District, Taipei City, Taiwan 100",
      geometry: {
        location: {
          lat: 25.0441073,
          lng: 121.523017,
        },
        viewport: {
          northeast: {
            lat: 25.04545097989272,
            lng: 121.5243935298927,
          },
          southwest: {
            lat: 25.04275132010727,
            lng: 121.5216938701072,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "北平上園樓(山西餐廳)",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 4480,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/115685702853360937458">Wenting Wang</a>',
          ],
          photo_reference:
            "AZose0nytTvV9Xlh_cHu7gR-uZYQIQNEMh87QnXO32ENe3-4maYDrFvBYSZORw0VyV2BcleBNroVrVnn9QMcsK_ZWDc4qIF25CLjtzD1Dq3c5rzOVtIM312hXl-YFEGGn216TCK7jAt18QQmc_Lgva8xLNBGfjfznOsm9X2ymuZ0tuFcQ2Ie",
          width: 6720,
        },
      ],
      place_id: "ChIJX8MT_3CpQjQRDIu4caKGCnk",
      plus_code: {
        compound_code: "2GVF+J6 Zhongzheng District, Taipei City",
        global_code: "7QQ32GVF+J6",
      },
      price_level: 2,
      rating: 3.9,
      reference: "ChIJX8MT_3CpQjQRDIu4caKGCnk",
      types: ["restaurant", "food", "point_of_interest", "establishment"],
      user_ratings_total: 1213,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address:
        "No. 27號, Section 1, Chang'an E Rd, Zhongshan District, Taipei City, Taiwan 10491",
      geometry: {
        location: {
          lat: 25.0493903,
          lng: 121.5242753,
        },
        viewport: {
          northeast: {
            lat: 25.05066107989272,
            lng: 121.5256027798927,
          },
          southwest: {
            lat: 25.04796142010728,
            lng: 121.5229031201073,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "Alice Steak House",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 2268,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/112609993177068629852">Pinky Chiang</a>',
          ],
          photo_reference:
            "AZose0nMjrcu5Db7ySp_n_AB0IJruIAorS93VhmfHNtZMqm-qSe3QzMLPr4Uh72AU4dF_-b7agwZB1m1Sxk-tECVzBmiFlSFq3B-7D9geNzZQaxpAf48t6lwrNjcrSSxYaBeZ-8P7PT_ZWIn43y-hvyBWmlI_XtbfjVfQ_8do2sAN3Hhewvf",
          width: 4032,
        },
      ],
      place_id: "ChIJAaWadG-pQjQRMj0E5mvtC6A",
      plus_code: {
        compound_code: "2GXF+QP Zhongshan District, Taipei City",
        global_code: "7QQ32GXF+QP",
      },
      price_level: 3,
      rating: 4,
      reference: "ChIJAaWadG-pQjQRMj0E5mvtC6A",
      types: ["restaurant", "food", "point_of_interest", "establishment"],
      user_ratings_total: 1140,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address:
        "No. 6號, Lane 107, Linsen N Rd, Zhongshan District, Taipei City, Taiwan 10491",
      geometry: {
        location: {
          lat: 25.0501919,
          lng: 121.525303,
        },
        viewport: {
          northeast: {
            lat: 25.05157837989272,
            lng: 121.5266641298927,
          },
          southwest: {
            lat: 25.04887872010728,
            lng: 121.5239644701072,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "Zheng Fu Yuan Restaurant",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 1560,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/107404608301522748420">JoJo Liao</a>',
          ],
          photo_reference:
            "AZose0n-q06auS5uehy7gua_V8R8yDIBVONu61cs9h1MHsLzl9TKxA0ROXmJJ86pykyWlnRXG7xEIcerlTMNj_KQ5DopJwR3E8DpyR5ADLI9dme398ccL4e_xqKFs2zwxpVasOEQXELAf6IrQ-vcClAQf9xGMY0_hs2nGdtmO2r8R6R7gzRO",
          width: 1171,
        },
      ],
      place_id: "ChIJ_____26pQjQRh9eiQk8uHpU",
      plus_code: {
        compound_code: "3G2G+34 Zhongshan District, Taipei City",
        global_code: "7QQ33G2G+34",
      },
      rating: 4.8,
      reference: "ChIJ_____26pQjQRh9eiQk8uHpU",
      types: ["restaurant", "food", "point_of_interest", "establishment"],
      user_ratings_total: 16,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address:
        "100, Taiwan, Taipei City, Zhongzheng District, Section 1, Zhongxiao E Rd, 12號17樓",
      geometry: {
        location: {
          lat: 25.044655,
          lng: 121.5217022,
        },
        viewport: {
          northeast: {
            lat: 25.04595742989272,
            lng: 121.5230380798927,
          },
          southwest: {
            lat: 25.04325777010728,
            lng: 121.5203384201073,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "Guest House Sheraton Grand Taipei Hotel",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 3240,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/109192696397174337701">宗毅林</a>',
          ],
          photo_reference:
            "AZose0kW3hmn5ucuElImRA2NMSitJGO2Sbli_xg4JN58nSpNwc2YCLdH2Sa0aahKKilkhSNvCf8AFwUDXhA_UQfaVuQbane7hEQWgOZ0APUB6SUVZkAvdmyeQsKOLtA4tTkrRDyXCdKZoXeUxjGZiaJektVgUKIJUMpFhRYnrALLge6zlwJi",
          width: 5760,
        },
      ],
      place_id: "ChIJJVBTsHGpQjQRujvx-I3zXPI",
      plus_code: {
        compound_code: "2GVC+VM Zhongzheng District, Taipei City",
        global_code: "7QQ32GVC+VM",
      },
      price_level: 3,
      rating: 4.4,
      reference: "ChIJJVBTsHGpQjQRujvx-I3zXPI",
      types: ["restaurant", "food", "point_of_interest", "establishment"],
      user_ratings_total: 1672,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address:
        "100, Taiwan, Taipei City, Zhongzheng District, Section 1, Zhongxiao E Rd, 12號1樓",
      geometry: {
        location: {
          lat: 25.0446184,
          lng: 121.5220051,
        },
        viewport: {
          northeast: {
            lat: 25.04606162989272,
            lng: 121.5231267298927,
          },
          southwest: {
            lat: 25.04336197010728,
            lng: 121.5204270701072,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
      icon_background_color: "#7B9EB0",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
      name: "Kitchen 12 - Sheraton Grand Taipei Hotel",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 3468,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/109638472277906798759">Arthur Pan</a>',
          ],
          photo_reference:
            "AZose0l7un-XAo6e7qGTtCOaxvvlA7aFiVJyEsi-7-STZGca4NB7B4eGkj_Z_ty_NEPZeZS-hbfJIyeKKfTZi3OaD33toRH2FkAzO9uGQOnnlI3KujKCts3nVSmF0dxeLW6W5pKPJRMMSVOm8ucczAUrKfp0xVDwPLbUuBbm_ibDLpxe6172",
          width: 4624,
        },
      ],
      place_id: "ChIJJVBTsHGpQjQRaCf_yDIMgJo",
      plus_code: {
        compound_code: "2GVC+RR Zhongzheng District, Taipei City",
        global_code: "7QQ32GVC+RR",
      },
      price_level: 3,
      rating: 3.7,
      reference: "ChIJJVBTsHGpQjQRaCf_yDIMgJo",
      types: ["restaurant", "food", "point_of_interest", "establishment"],
      user_ratings_total: 7231,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address:
        "No. 6之2號, Qingdao E Rd, Zhongzheng District, Taipei City, Taiwan 100",
      geometry: {
        location: {
          lat: 25.0437017,
          lng: 121.5220376,
        },
        viewport: {
          northeast: {
            lat: 25.04512752989272,
            lng: 121.5233827798928,
          },
          southwest: {
            lat: 25.04242787010728,
            lng: 121.5206831201073,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "Moon Moon Food Qingdao Branch",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 2252,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/103537005435138987125">張逸仁</a>',
          ],
          photo_reference:
            "AZose0k4hndHSEcigQ-a0ZrA-_bHieZYzG-5gPFvYoed1P8-gxR5dsTS4BFmIG0IfGQDRF0_0tR9ZbNHOu2OgrF0qmbaNke4n0XfRCUqe-Qv6tnL-7d5k8gx5Jyn4gstLaKJRI89-gC4phE3sryEwDSHQljAfHp8f3mM73H6DJ6ttE38TFTc",
          width: 4000,
        },
      ],
      place_id: "ChIJgbsfD3GpQjQR7z5ZO22KdVQ",
      plus_code: {
        compound_code: "2GVC+FR Zhongzheng District, Taipei City",
        global_code: "7QQ32GVC+FR",
      },
      price_level: 2,
      rating: 4.7,
      reference: "ChIJgbsfD3GpQjQR7z5ZO22KdVQ",
      types: [
        "restaurant",
        "meal_delivery",
        "store",
        "food",
        "point_of_interest",
        "establishment",
      ],
      user_ratings_total: 14274,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address:
        "No. 88號, Section 1, Xinsheng N Rd, Zhongshan District, Taipei City, Taiwan 10491",
      geometry: {
        location: {
          lat: 25.0477439,
          lng: 121.5297328,
        },
        viewport: {
          northeast: {
            lat: 25.04912352989272,
            lng: 121.5311185798927,
          },
          southwest: {
            lat: 25.04642387010728,
            lng: 121.5284189201072,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "Wayne's Boston",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 1074,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/116023123925602639094">A Google User</a>',
          ],
          photo_reference:
            "AZose0m1SZGA3QB5WXpPIbIFiyUDzj3OFTPjq7f_soui4uFybzn53wUDK1lJGfc2cDRwiXjZP3jIGNfRDoOjXo_TDrfQMRZVnps3iU4SnFs7QkzAUMyLb_gQj-HWtin7xECqVndBWOdbOIpU45wOV1Bk2jyeC9zmE4i23EeOsX03ogqsP24",
          width: 1524,
        },
      ],
      place_id: "ChIJGfix9WSpQjQRt8-Hz1c_JCk",
      plus_code: {
        compound_code: "2GXH+3V Zhongshan District, Taipei City",
        global_code: "7QQ32GXH+3V",
      },
      price_level: 3,
      rating: 4.4,
      reference: "ChIJGfix9WSpQjQRt8-Hz1c_JCk",
      types: ["restaurant", "food", "point_of_interest", "establishment"],
      user_ratings_total: 1161,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address:
        "No. 1號, Section 1, Jinan Rd, Zhongzheng District, Taipei City, Taiwan 100",
      geometry: {
        location: {
          lat: 25.0432245,
          lng: 121.5204226,
        },
        viewport: {
          northeast: {
            lat: 25.04445472989272,
            lng: 121.5216686798928,
          },
          southwest: {
            lat: 25.04175507010727,
            lng: 121.5189690201073,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "國會康園-立法院餐廳",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 3024,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/105521352586764009857">健修</a>',
          ],
          photo_reference:
            "AZose0n0HwiD0WnBxLB8eLsX71uCo2fMPS8a5OajPhtstvrV44YM3EI8XdeWjvBbgSlqSg4Z94jzujoIFzpvPaWDpLa_RxNbkVj53x7rfaw4504GIzDm8e5vQT_OSlUPqMzYQovefbC25AbPyi-FPAmRPVkdUxoLQ8Syvg5nE8W2466A7UZ8",
          width: 4032,
        },
      ],
      place_id: "ChIJu2HY4XOpQjQRO1nFq2BnAqI",
      plus_code: {
        compound_code: "2GVC+75 Zhongzheng District, Taipei City",
        global_code: "7QQ32GVC+75",
      },
      price_level: 2,
      rating: 4.1,
      reference: "ChIJu2HY4XOpQjQRO1nFq2BnAqI",
      types: ["restaurant", "food", "point_of_interest", "establishment"],
      user_ratings_total: 655,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address:
        "No. 8, Section 1, Chang'an E Rd, Zhongshan District, Taipei City, Taiwan 10491",
      geometry: {
        location: {
          lat: 25.049524,
          lng: 121.522561,
        },
        viewport: {
          northeast: {
            lat: 25.05091232989272,
            lng: 121.5239224798927,
          },
          southwest: {
            lat: 25.04821267010728,
            lng: 121.5212228201073,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "川之流精緻涮涮鍋長安店—肉品海鮮任你選 | 中山區火鍋 | 長安東路餐廳 | 濕式熟成牛肉 | 附自助吧檯 | 甜品櫃 | 火鍋",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 480,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/114053995239625492692">川之流涮涮鍋</a>',
          ],
          photo_reference:
            "AZose0kD1R3EE8fcs37t7BpAeMc0x7Sh_3hBGqm-K1Mfl7V84l5CATkOHhMyIu8ik5ul3OpzPndgyLhs7Sb1bG9uv06s5ILUVmV5ZU_ZNzLnFZigUfFzqJz3V0Mq-Hd3zJ27o1w0oGFnrDUoHQHYf9PLGvx2yQ7YOglO1ShNcqv7FSZbhkFI",
          width: 640,
        },
      ],
      place_id: "ChIJS66H_26pQjQR08Jm7q2JiTI",
      plus_code: {
        compound_code: "2GXF+R2 Zhongshan District, Taipei City",
        global_code: "7QQ32GXF+R2",
      },
      price_level: 2,
      rating: 4.6,
      reference: "ChIJS66H_26pQjQR08Jm7q2JiTI",
      types: ["restaurant", "food", "point_of_interest", "establishment"],
      user_ratings_total: 1627,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address:
        "No. 8號, Lane 107, Linsen N Rd, Zhongshan District, Taipei City, Taiwan 10491",
      geometry: {
        location: {
          lat: 25.0501842,
          lng: 121.5253369,
        },
        viewport: {
          northeast: {
            lat: 25.05157027989272,
            lng: 121.5266979298928,
          },
          southwest: {
            lat: 25.04887062010728,
            lng: 121.5239982701073,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "梅子鰻蒲燒專賣店 Umeko Japanese Unagi Restaurant",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 1440,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/105964758109967216631">Gaspar Xie</a>',
          ],
          photo_reference:
            "AZose0mh2sEORkni7dRcCuEht096gdi7o799tr_pknBmiwnqVrir8Ub-yyirx7xsLH1m-buQQ8DqS_OAXRoBGSlyhf6YIxsNMUU-2pEDCCJKPJM9m0T0pCJ8UmLVYL37VVioziXIQPklm1w0H_lEyoDb61XvkHCbjiGFep7ayKifZIU72pQ",
          width: 2560,
        },
      ],
      place_id: "ChIJA2qHXm-pQjQRiyN6s2aaQ6Q",
      plus_code: {
        compound_code: "3G2G+34 Zhongshan District, Taipei City",
        global_code: "7QQ33G2G+34",
      },
      price_level: 2,
      rating: 4.5,
      reference: "ChIJA2qHXm-pQjQRiyN6s2aaQ6Q",
      types: ["restaurant", "food", "point_of_interest", "establishment"],
      user_ratings_total: 2249,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address:
        "No. 13-3, Lane 83, Section 1, Zhongshan N Rd, Zhongshan District, Taipei City, Taiwan 10491",
      geometry: {
        location: {
          lat: 25.0500701,
          lng: 121.524148,
        },
        viewport: {
          northeast: {
            lat: 25.05137362989272,
            lng: 121.5254848298927,
          },
          southwest: {
            lat: 25.04867397010728,
            lng: 121.5227851701073,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "新胡同魚菜餐廳",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 3468,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/112280823442410945245">鄒力</a>',
          ],
          photo_reference:
            "AZose0kU9dCqHS_zJowBHbFmdBT9lE_FXvHbO1A_yPBUHtKGpa5FwwzYt02iZTNEPOlDU0jsVmbWBTpaPAbzca8DKXtk8XovHhPmg6bBuKvykk6h6j5XLM8kZQlmBr3ix6sgHeqcrA8EMwKnU1xyrTFeX7AnjUuRKz1T_Yp_tBKGs6r3UDqH",
          width: 4624,
        },
      ],
      place_id: "ChIJzeZUE2-pQjQR75oZeFMqRYA",
      plus_code: {
        compound_code: "3G2F+2M Zhongshan District, Taipei City",
        global_code: "7QQ33G2F+2M",
      },
      price_level: 2,
      rating: 4.3,
      reference: "ChIJzeZUE2-pQjQR75oZeFMqRYA",
      types: ["restaurant", "food", "point_of_interest", "establishment"],
      user_ratings_total: 214,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address:
        "No. 2-3號, Xuzhou Rd, Zhongzheng District, Taipei City, Taiwan 100",
      geometry: {
        location: {
          lat: 25.0409841,
          lng: 121.5216763,
        },
        viewport: {
          northeast: {
            lat: 25.04238732989272,
            lng: 121.5230427798927,
          },
          southwest: {
            lat: 25.03968767010727,
            lng: 121.5203431201073,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "台大男二宿舍餐廳",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 2252,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/112350194573469681900">王怡斌</a>',
          ],
          photo_reference:
            "AZose0n-73CA_pKffmjWWkU2fZrQbtQmqK35pfugLqvmnb9rD6hYcroQcLLZE9PWne6JWNgmojObFez_3P4WPsWH9FG7YOUk94-CiP6beVA7iiLFz9hOhV_e6I0o_U367HXw0ZvgNXZg-KnzTAXCMbda44Cl2dOgucGhri5X528by4ag0p8Y",
          width: 4000,
        },
      ],
      place_id: "ChIJ2wznxXapQjQRXv1AYV7llMg",
      plus_code: {
        compound_code: "2GRC+9M Zhongzheng District, Taipei City",
        global_code: "7QQ32GRC+9M",
      },
      price_level: 1,
      rating: 4,
      reference: "ChIJ2wznxXapQjQRXv1AYV7llMg",
      types: ["restaurant", "food", "point_of_interest", "establishment"],
      user_ratings_total: 122,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address:
        "B1, No. 2號, Section 2, Zhongshan N Rd, Zhongshan District, Taipei City, Taiwan 10491",
      geometry: {
        location: {
          lat: 25.0524457,
          lng: 121.5221961,
        },
        viewport: {
          northeast: {
            lat: 25.05378402989272,
            lng: 121.5236769298927,
          },
          southwest: {
            lat: 25.05108437010727,
            lng: 121.5209772701073,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "六堆伙房 中山南西店",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 1333,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/104934717081855116261">六堆伙房客家精緻麵食館中山店</a>',
          ],
          photo_reference:
            "AZose0kdbNs7sdS9GGo6941ksr_Cc-l_N20TjKLTqtMgdXe2Y1ZIcskhxZICrcO3qYLkesncwnNP5kNkXxiNlnRKmAV1C9jpEqGgnTPaYHQ5xtcVwu0QYimFsFiOL4z0fw7eADkeWwT1ldPhHc4-jivrh3_GUS6zMh2PSIWQ5vZRpGVRPRnh",
          width: 2000,
        },
      ],
      place_id: "ChIJlazMLmmpQjQReLshHPG2fyQ",
      plus_code: {
        compound_code: "3G2C+XV Zhongshan District, Taipei City",
        global_code: "7QQ33G2C+XV",
      },
      price_level: 2,
      rating: 4.2,
      reference: "ChIJlazMLmmpQjQReLshHPG2fyQ",
      types: ["restaurant", "food", "point_of_interest", "establishment"],
      user_ratings_total: 3790,
    },
    {
      business_status: "OPERATIONAL",
      formatted_address:
        "No. 5號, Lane 69, Songjiang Rd, Zhongshan District, Taipei City, Taiwan 104",
      geometry: {
        location: {
          lat: 25.0494385,
          lng: 121.53387,
        },
        viewport: {
          northeast: {
            lat: 25.05075712989272,
            lng: 121.5352188298927,
          },
          southwest: {
            lat: 25.04805747010728,
            lng: 121.5325191701073,
          },
        },
      },
      icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
      icon_background_color: "#FF9E67",
      icon_mask_base_uri:
        "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
      name: "淘憩時光親子餐廳",
      opening_hours: {
        open_now: true,
      },
      photos: [
        {
          height: 3024,
          html_attributions: [
            '<a href="https://maps.google.com/maps/contrib/102919360059387191762">薛平</a>',
          ],
          photo_reference:
            "AZose0nKBYXYyQPgDHAR0tj_ab2fRY0wfXg3gX0WIFa6_IQiHIh3FzjyOO6vw4OzmlXJUZ2dsUGtdF7xRX6jQh-yglGo_JCcqtutVy_JNNkVFODxco7UcAhgJoyde209OGTb84t2z5_LktT9M2MtEy415kTrwcSdXjuI1cfT2ikew7E5DzZX",
          width: 4032,
        },
      ],
      place_id: "ChIJoaP21WOpQjQRujwXUxC4FME",
      plus_code: {
        compound_code: "2GXM+QG Zhongshan District, Taipei City",
        global_code: "7QQ32GXM+QG",
      },
      price_level: 2,
      rating: 4.4,
      reference: "ChIJoaP21WOpQjQRujwXUxC4FME",
      types: [
        "restaurant",
        "store",
        "food",
        "point_of_interest",
        "establishment",
      ],
      user_ratings_total: 718,
    },
  ]);
  const getItemStyle = (isDragging, draggableStyle) => ({
    ...draggableStyle,
    userSelect: "none",
    width: "540px",
  });
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const items = reorder(
      places,
      result.source.index,
      result.destination.index
    );
    setPlaces(items);
  };

  return (
    <Flex direction="column" align="center" justify="center">
      {/* {places.map((place) => (
        <PlaceItem key={place.id} place={place} />
      ))} */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <VStack
              {...provided.droppableProps}
              ref={provided.innerRef}
              borderTopRadius={6}
              alignItems="flex-start"
              spacing={0}
            >
              {places.map((place, index) => (
                <Draggable
                  key={place.place_id}
                  draggableId={place.place_id + ""}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <PlaceItem
                        key={place.place_id}
                        id={place.place_id}
                        place={place}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </VStack>
          )}
        </Droppable>
      </DragDropContext>
    </Flex>
  );
};

export default placeList;
