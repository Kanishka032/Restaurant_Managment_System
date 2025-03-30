PGDMP                      }            Restaurant_managment_Api    16.6    16.6 .    "           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            #           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            $           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            %           1262    41580    Restaurant_managment_Api    DATABASE     �   CREATE DATABASE "Restaurant_managment_Api" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_India.1252';
 *   DROP DATABASE "Restaurant_managment_Api";
                postgres    false            �            1259    42085    branch    TABLE     �   CREATE TABLE public.branch (
    branch_id integer NOT NULL,
    branch_location character varying(255),
    branch_name character varying(255)
);
    DROP TABLE public.branch;
       public         heap    postgres    false            �            1259    42084    branch_branch_id_seq    SEQUENCE     �   ALTER TABLE public.branch ALTER COLUMN branch_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.branch_branch_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    216            �            1259    42093    customer    TABLE     �   CREATE TABLE public.customer (
    cust_id integer NOT NULL,
    cust_name character varying(255),
    cust_phone character varying(255),
    branch_id integer NOT NULL
);
    DROP TABLE public.customer;
       public         heap    postgres    false            �            1259    42092    customer_cust_id_seq    SEQUENCE     �   ALTER TABLE public.customer ALTER COLUMN cust_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.customer_cust_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    218            �            1259    42101 
   food_order    TABLE     <  CREATE TABLE public.food_order (
    food_order_id integer NOT NULL,
    cust_contact character varying(255),
    cust_name character varying(255),
    order_crt_time timestamp(6) without time zone,
    order_dlv_time date,
    status character varying(255),
    total_price double precision,
    cust_id integer
);
    DROP TABLE public.food_order;
       public         heap    postgres    false            �            1259    42100    food_order_food_order_id_seq    SEQUENCE     �   ALTER TABLE public.food_order ALTER COLUMN food_order_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.food_order_food_order_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    220            �            1259    42109    food_product    TABLE     8  CREATE TABLE public.food_product (
    food_prod_id integer NOT NULL,
    food_prod_about character varying(255),
    food_prod_availibility character varying(255),
    food_prod_name character varying(255),
    food_prod_price double precision,
    food_prod_type character varying(255),
    menu_id integer
);
     DROP TABLE public.food_product;
       public         heap    postgres    false            �            1259    42108    food_product_food_prod_id_seq    SEQUENCE     �   ALTER TABLE public.food_product ALTER COLUMN food_prod_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.food_product_food_prod_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    222            �            1259    42117    item    TABLE     �   CREATE TABLE public.item (
    item_id integer NOT NULL,
    price double precision,
    quantity integer,
    food_order_id integer,
    food_prod_id integer
);
    DROP TABLE public.item;
       public         heap    postgres    false            �            1259    42116    item_item_id_seq    SEQUENCE     �   ALTER TABLE public.item ALTER COLUMN item_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.item_item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    224            �            1259    42123    menu    TABLE       CREATE TABLE public.menu (
    menu_id integer NOT NULL,
    dish_category character varying(100),
    dish_name character varying(255) NOT NULL,
    dish_price double precision NOT NULL,
    image_url character varying(2048),
    branch_id integer NOT NULL
);
    DROP TABLE public.menu;
       public         heap    postgres    false            �            1259    42122    menu_menu_id_seq    SEQUENCE     �   ALTER TABLE public.menu ALTER COLUMN menu_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.menu_menu_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    226            �            1259    42131    users    TABLE     �  CREATE TABLE public.users (
    user_id integer NOT NULL,
    user_addr character varying(255),
    user_age integer,
    user_contact character varying(255),
    user_dob timestamp(6) without time zone,
    user_email character varying(255),
    user_gender character varying(255),
    user_name character varying(255),
    user_pwd character varying(255),
    user_role character varying(255),
    user_salary double precision,
    branch_id integer
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    42130    users_user_id_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN user_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.users_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    228                      0    42085    branch 
   TABLE DATA           I   COPY public.branch (branch_id, branch_location, branch_name) FROM stdin;
    public          postgres    false    216   �9                 0    42093    customer 
   TABLE DATA           M   COPY public.customer (cust_id, cust_name, cust_phone, branch_id) FROM stdin;
    public          postgres    false    218   �9                 0    42101 
   food_order 
   TABLE DATA           �   COPY public.food_order (food_order_id, cust_contact, cust_name, order_crt_time, order_dlv_time, status, total_price, cust_id) FROM stdin;
    public          postgres    false    220   �:                 0    42109    food_product 
   TABLE DATA           �   COPY public.food_product (food_prod_id, food_prod_about, food_prod_availibility, food_prod_name, food_prod_price, food_prod_type, menu_id) FROM stdin;
    public          postgres    false    222   u=                 0    42117    item 
   TABLE DATA           U   COPY public.item (item_id, price, quantity, food_order_id, food_prod_id) FROM stdin;
    public          postgres    false    224   [@                 0    42123    menu 
   TABLE DATA           c   COPY public.menu (menu_id, dish_category, dish_name, dish_price, image_url, branch_id) FROM stdin;
    public          postgres    false    226   �A                 0    42131    users 
   TABLE DATA           �   COPY public.users (user_id, user_addr, user_age, user_contact, user_dob, user_email, user_gender, user_name, user_pwd, user_role, user_salary, branch_id) FROM stdin;
    public          postgres    false    228   �C       &           0    0    branch_branch_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.branch_branch_id_seq', 3, true);
          public          postgres    false    215            '           0    0    customer_cust_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.customer_cust_id_seq', 11, true);
          public          postgres    false    217            (           0    0    food_order_food_order_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.food_order_food_order_id_seq', 39, true);
          public          postgres    false    219            )           0    0    food_product_food_prod_id_seq    SEQUENCE SET     L   SELECT pg_catalog.setval('public.food_product_food_prod_id_seq', 19, true);
          public          postgres    false    221            *           0    0    item_item_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.item_item_id_seq', 100, true);
          public          postgres    false    223            +           0    0    menu_menu_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.menu_menu_id_seq', 19, true);
          public          postgres    false    225            ,           0    0    users_user_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.users_user_id_seq', 66, true);
          public          postgres    false    227            o           2606    42091    branch branch_pkey 
   CONSTRAINT     W   ALTER TABLE ONLY public.branch
    ADD CONSTRAINT branch_pkey PRIMARY KEY (branch_id);
 <   ALTER TABLE ONLY public.branch DROP CONSTRAINT branch_pkey;
       public            postgres    false    216            q           2606    42099    customer customer_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (cust_id);
 @   ALTER TABLE ONLY public.customer DROP CONSTRAINT customer_pkey;
       public            postgres    false    218            s           2606    42107    food_order food_order_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.food_order
    ADD CONSTRAINT food_order_pkey PRIMARY KEY (food_order_id);
 D   ALTER TABLE ONLY public.food_order DROP CONSTRAINT food_order_pkey;
       public            postgres    false    220            u           2606    42115    food_product food_product_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.food_product
    ADD CONSTRAINT food_product_pkey PRIMARY KEY (food_prod_id);
 H   ALTER TABLE ONLY public.food_product DROP CONSTRAINT food_product_pkey;
       public            postgres    false    222            w           2606    42121    item item_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_pkey PRIMARY KEY (item_id);
 8   ALTER TABLE ONLY public.item DROP CONSTRAINT item_pkey;
       public            postgres    false    224            y           2606    42129    menu menu_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.menu
    ADD CONSTRAINT menu_pkey PRIMARY KEY (menu_id);
 8   ALTER TABLE ONLY public.menu DROP CONSTRAINT menu_pkey;
       public            postgres    false    226            {           2606    42137    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    228                       2606    42153     item fk1xp3w04yi6axstpgg0lutp71n    FK CONSTRAINT     �   ALTER TABLE ONLY public.item
    ADD CONSTRAINT fk1xp3w04yi6axstpgg0lutp71n FOREIGN KEY (food_order_id) REFERENCES public.food_order(food_order_id);
 J   ALTER TABLE ONLY public.item DROP CONSTRAINT fk1xp3w04yi6axstpgg0lutp71n;
       public          postgres    false    220    224    4723            �           2606    42158     item fk7q0rpvl2ynmr75ushmhnt2d2q    FK CONSTRAINT     �   ALTER TABLE ONLY public.item
    ADD CONSTRAINT fk7q0rpvl2ynmr75ushmhnt2d2q FOREIGN KEY (food_prod_id) REFERENCES public.food_product(food_prod_id);
 J   ALTER TABLE ONLY public.item DROP CONSTRAINT fk7q0rpvl2ynmr75ushmhnt2d2q;
       public          postgres    false    222    224    4725            ~           2606    42148 (   food_product fk88ldkav1t0mnex8wly6gb2jwa    FK CONSTRAINT     �   ALTER TABLE ONLY public.food_product
    ADD CONSTRAINT fk88ldkav1t0mnex8wly6gb2jwa FOREIGN KEY (menu_id) REFERENCES public.menu(menu_id);
 R   ALTER TABLE ONLY public.food_product DROP CONSTRAINT fk88ldkav1t0mnex8wly6gb2jwa;
       public          postgres    false    226    222    4729            |           2606    42138 $   customer fkehjjh2rstm0jx7kpw0gwub4id    FK CONSTRAINT     �   ALTER TABLE ONLY public.customer
    ADD CONSTRAINT fkehjjh2rstm0jx7kpw0gwub4id FOREIGN KEY (branch_id) REFERENCES public.branch(branch_id);
 N   ALTER TABLE ONLY public.customer DROP CONSTRAINT fkehjjh2rstm0jx7kpw0gwub4id;
       public          postgres    false    4719    216    218            �           2606    42168 !   users fkixo09sv3j1j6hfox3cx6d2ggg    FK CONSTRAINT     �   ALTER TABLE ONLY public.users
    ADD CONSTRAINT fkixo09sv3j1j6hfox3cx6d2ggg FOREIGN KEY (branch_id) REFERENCES public.branch(branch_id);
 K   ALTER TABLE ONLY public.users DROP CONSTRAINT fkixo09sv3j1j6hfox3cx6d2ggg;
       public          postgres    false    228    4719    216            �           2606    42163     menu fkpyh3xj6lvx49gm5nuqlv1u8tk    FK CONSTRAINT     �   ALTER TABLE ONLY public.menu
    ADD CONSTRAINT fkpyh3xj6lvx49gm5nuqlv1u8tk FOREIGN KEY (branch_id) REFERENCES public.branch(branch_id);
 J   ALTER TABLE ONLY public.menu DROP CONSTRAINT fkpyh3xj6lvx49gm5nuqlv1u8tk;
       public          postgres    false    4719    216    226            }           2606    42143 &   food_order fkt91uy9j1ox7j9a2h5ryamnpfq    FK CONSTRAINT     �   ALTER TABLE ONLY public.food_order
    ADD CONSTRAINT fkt91uy9j1ox7j9a2h5ryamnpfq FOREIGN KEY (cust_id) REFERENCES public.customer(cust_id);
 P   ALTER TABLE ONLY public.food_order DROP CONSTRAINT fkt91uy9j1ox7j9a2h5ryamnpfq;
       public          postgres    false    220    218    4721               3   x�3��-�MJ̄R
NE�y�\ƜN�y�9�E�LҐ3���b���� ���         �   x�]��
�@���>�<Ax��ܥ�����,BQ"��o 7�9��p~�)��)�s� �f�aM	j��a��=��MH�����:"�9km��-dbE8���WM���ac���F۪)s�,rё��tu��Pt�-Ne���5�}J���x�!�ƾ2�         �  x����j�@�����t���J=A0M۫܈VĦ�S�з﬜P%�������ĩI1x&���ns�>�]���~C�C�2'�	U''�Ű���φ<4آ4)�c�7_�?�����?��uH�8+:�@&G4ܢ�j$��W��ܭ�����c�(���)+jH-��bG���(ғ����~o����jCO!��<��`ƪ�O�#|�����T���� FY�	��R���Z숊U(9sJ*��
NM,a]uRp^���H�<����2x��N~rFW�8��E� ����+4�zs34�ú�6���s^�:��8�c����ո�4x�� ����x(Y�Id�q��a�:^��]� �T�<�ԅg�L�a0�c�����џn����vx9�Ji)l�B�e<_���a�[w����>/�T{g*�|V��LU��+��!>3`��1l�ŀil ��ł�hD�d��ȝ&��8�u�KYg�i^생c�]bft$jq0�C�Mݲ:l�����6�&Z\���g�`��%	%	ί\ӊY�܄A���r����J�݂8
b������+O6�I%-\��ڼ�������v��>���\��.r�ij�հ�i���P�_�'�Ig��Js4�����G��D��-�R�Z�(�s~�?=�pUp�Cy������������I�����@�S^.�BM��6���g�F(�]��m�u_         �  x�u��n�0�����d��c/�;u����n���Ȗ!�	���l�q��&R��O�'3��5��R�g��є��
��1��>B�1t/��]z���g�;��ֳ�T�L.��i�t���1|hO'�]u(�BE��O����S|+2�E�B�����,��̱�H]C����0��=E�x�&�m9HZ�byS��k�5���P4�K)}�b�}�	���s���f����}Yi�g>t��b�e��s�P�ot���Ó'[`߬/�2�ɻ��N|t�8�W��cƨsB�rG)D�4	�`�]��SO՝TJ|r�ݪ�������q�#p1�RRebgC��%�D�&e�����Q�K,5�ȉ�2Iͤ���fvr��*m�pl�ưW�RS���w�m&��-��oX�5�s.�B��)@�g{������N/֥��z��A-�"qR-�G6����^kM��]�q����Q���!T�ZJ�O�u��y8�&腕�0���sK~�H�ʏw}b�J�Tk�>j��i��!Nm�����RG]k�6��$�y��V�[[�����!W�(���s��-�����$G>	Ӯ�D�����y���n�ʀ�#G���������\|!4��狣��Q^C蓪���¶���t��Ȓ��rɋ�Kgm�_�	L��i�����g�y|5RD��K�yg����koZ�M�m���gI�F�� ��b&�         Z  x�=R[�� �&�Yy�e������h�k;1	~�y���|�4��Dn��&�7ɵ� �qnC�(ǲ�F�+s�mW����"pG\�qM.��$aۮ+EWH�J��p�~vXp�\�K�'t�9�(�Z���\DiJꔖ�Ni�ɺNm|��b�y��/с3\M�k�cn�m�9gY��˦��&{��$���K�y���\
P��2�Bn���HگTi�;ɼR H�J�(mI��zn�j�+��k�+�F�/��6>_No�15�/g^���CNoȭZ�r�-;�rO���~�~��%}[���ȗ�|Iߗ����}��J�ñ�|0����� I��         �  x����n�0Eף��ئ�W���Mj ���ceb��I��k��KQ"�؍V�gn�MG��A�����y����.��y�+lkm���b���3������	ѠK�nt� ������FԱ�h�^$�����	�����Q�*�!_%T�Vd��϶�G�X��ƒ�ذ�
Eꭞ�5�x>j�e���~5n>7�G����%l������k7w��N�E���|�pYO��x��Z2|��xd�x�*੥����uT=�EÞ��������|�����1!+��T����e-���X�"���F}�K��e��-��+�L�**�%�g�y�R��0D�S�a��Z���z��H����h}�|�Ѕ��P���ǻk�~���25�����n&�l�����<�f�������Z�B�P�GmkX��8D���>����щ�����l����~�.�0(��SD�jݔ�XŲ֕n�#�3����Qj�1"�H8��,˲P��K         �  x�m�͒�8���)� c�%�`g����$]�����F���%:���
�R:bGU}��s��*R�����n4B��g���:�e�/��'��Y�)�>e1rh�<��C�K_uO�D��)d�V�û6{��~��D��~a��$��k�_���K yaq˪,r䱦ɒ�L��!y��1Z0=|?�?u�A׈��"�9��B2���!%r�$���i#ft��ܢ�:��em�=w��|#�-���q4�I�(���F��������/�E���j�G��p�z:����eN��<���_z~��e�-�<�Tڋ6f|�"]�7�o�˒X^0�"���.��{�p6bhӓ�:��wN�'����yI60*?�ң�]7IV%�	bf��*=��T,g�ҕS��������p�5i&p��*aܮTp�`,�� ]�Q��N�����*���8�y��sYք�~⒎F�`l#�޺��t �o����ܿ���<9�ŶER'<0~2�
�E|\�M6(���j�
�(o���<��ފoo����Y��J��R��٪t�j;�I���{a����OJ�X���t�NZ�z�:]9=��i�ٜ��1����I�Ǵn�Cl��(�Gc���aN��^�3\{���l=�;�T^E��U�ժ10�6� ��_�J��X�ˬA����d�l*-:��s*݂��x�sY��V�����4�˳-M��e�g�� �I��ݠJ��3˦���3��*Ӆ��E�Խ�X�oz����e��7����-K<�igv���L5��,p��(U:�O��gT�Ω1vs�\e䋞������1�6��r�֜Gi'�Ut��n�'��.x
t�Ƀ�����/�_%��V�Lx�B����޻hm�����l�킬�C�
�7sa��q��m��~��WN�[�c���/],���җ     